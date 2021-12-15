import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: "*",
});

let users = [];

let roomUsers = {};

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) && users.push({ userId, socketId });
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

io.on("connection", (socket) => {
  // When connect
  console.log("A user connected");
  // Take userId and SocketId from user

  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // Send and get message
  socket.on("sendMessage", (message) => {
    const listUser = message.receiverId;
    listUser?.forEach((userId) => {
      const user = getUser(userId);
      if (user) {
        io.to(user.socketId).emit("getMessage", message);
      }
    });
  });

  socket.on("joinRoom", (payload) => {
    roomUsers[payload.roomId]
      ? roomUsers[payload.roomId].push(payload.userId)
      : (roomUsers[payload.roomId] = [payload.userId]);
    socket.emit(
      "callAccepted",
      roomUsers[payload.roomId].filter((id) => id !== payload.userId)
    );
  });

  socket.on("callUser", ({ members, userInfo, callType, roomId }) => {
    const receivingMembers = members.filter((member) => member !== userInfo._id);
    receivingMembers?.forEach((userId) => {
      const user = getUser(userId);
      if (user) {
        io.to(user.socketId).emit("receivingCall", {
          calleeInfo: userInfo,
          callType,
          members,
          roomId,
        });
      }
    });
  });

  socket.on("sendingSignal", (payload) => {
    const user = getUser(payload.userToSignal);
    if (user) {
      io.to(user.socketId).emit("userJoined", {
        signal: payload.signal,
        callerID: payload.callerID,
      });
    }
  });

  socket.on("returningSignal", (payload) => {
    const user = getUser(payload.callerID);
    const receivingUser = users.find((u) => u.socketId === socket.id);
    if (user) {
      io.to(user.socketId).emit("receivingReturnedSignal", {
        signal: payload.signal,
        id: receivingUser.userId,
      });
    }
  });

  socket.on("stopCall", ({ members, stoppedId, roomId }) => {
    roomUsers[roomId] = roomUsers[roomId]?.filter((id) => id !== stoppedId);
    if (roomUsers[roomId].length === 1) {
      delete roomUsers[roomId];
    }
    members?.forEach((userId) => {
      const user = getUser(userId);
      if (user) {
        io.to(user.socketId).emit("callStopped", stoppedId);
      }
    });
  });

  socket.on("addFriends", (reqFriendInfo) => {
    const user = getUser(reqFriendInfo.receiverId);
    if (user) {
      io.to(user.socketId).emit("getInvitedFriend", reqFriendInfo);
    }
  });

  // When disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected");
    roomUsers = {};
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

server.listen(5000, () => {
  console.log("Socket is listening on port 5000");
});
