import React, { useEffect } from "react";
import SwitchComponents from "../../utils/SwitchComponents.js";
import { useSelector, useDispatch } from "react-redux";
import { getInvitedFriendsAction, getFriendsAction } from "../../redux/actions/users.js";
import { useSocket } from "../../services/Socket.js";
import Chats from "./chats/Chats.jsx";
import Friends from "./friends/Friends.jsx";

export default function Sidebar({ setCurrentChat }) {
  const dispatch = useDispatch();
  const socket = useSocket();
  const activeComponent = useSelector((state) => state.activeComponent);
  const friendRequestInfo = useSelector((state) => state.getInvitedFriends.friendsInfo);

  useEffect(() => {
    dispatch(getInvitedFriendsAction());
    dispatch(getFriendsAction());
  }, [dispatch]);

  useEffect(() => {
    socket?.on("getInvitedFriend", (friendReqSocketInfo) => {
      if (friendRequestInfo) {
        dispatch(getInvitedFriendsAction([...friendRequestInfo, friendReqSocketInfo.user]));
      }
    });
  }, [dispatch, friendRequestInfo, socket]);

  return (
    <div className="sidebar">
      <SwitchComponents active={activeComponent}>
        <Chats setCurrentChat={setCurrentChat} name="chats" />
        <Friends
          friendRequestInfo={friendRequestInfo}
          setCurrentChat={setCurrentChat}
          name="friends"
        />
      </SwitchComponents>
    </div>
  );
}
