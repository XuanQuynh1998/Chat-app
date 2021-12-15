import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getLastestMessagesAction } from "../../redux/actions/chats.js";
import { useSocket } from "../../services/Socket.js";
import { format } from "timeago.js";
import "../sidebar/sidebar.css";

export default function Conversation({ conversationInfo, lastestMessage }) {
  const socket = useSocket();
  const dispatch = useDispatch();
  const [lastMessage, setLastMessage] = useState(null);
  // const [newMessage, setNewMessage] = useState("");
  // const [sender, setSender] = useState("");
  // const user = useSelector((state) => state.authenticate.user);

  useEffect(() => {
    socket.on("getMessage", (message) => {
      setLastMessage(message);
      dispatch(getLastestMessagesAction());
    });
  }, [dispatch, socket]);

  // useEffect(() => {
  //   if (lastMessage) {
  //     setSender(lastMessage?.senderId === user._id ? "You:" : "Other:");
  //   } else {
  //     setSender(
  //       lastestMessage && lastestMessage[0]?.lastestMessage.senderId === user._id
  //         ? "You:"
  //         : "Other:"
  //     );
  //   }
  // }, [friendInfo._id, lastMessage, lastestMessage, user._id]);

  // useEffect(() => {
  //   if (lastMessage) {
  //     setNewMessage(friendInfo._id === lastMessage?.senderId && lastMessage?.text);
  //     // setLastMessage("");
  //   } else {
  //     setNewMessage(lastestMessage && lastestMessage[0]?.lastestMessage?.text);
  //   }
  // }, [friendInfo._id, lastMessage, lastestMessage]);

  // console.log(newMessage);

  // const setLastestMessage = () => {
  //   let message = "";
  //   if (lastMessage) {
  //     message = friendInfo._id === lastMessage?.senderId && lastMessage?.text;
  //     setLastMessage("");
  //     return message;
  //   }
  //   message = lastestMessage && lastestMessage[0]?.lastestMessage?.text;
  //   setLastMessage("");
  //   return message;
  // };

  return (
    <div className="sidebar-body__item">
      <div className="sidebar-body__item-avatar">
        <img
          src={conversationInfo.friendInfo.userInfo.avatar}
          alt=""
          className="sidebar-body__item-avatar-img"
        />
      </div>
      <div className="sidebar-body__item-body">
        <div className="sidebar-body__item-message">
          <div className="sidebar-body__item-username">
            {conversationInfo.conversation.name ||
              conversationInfo.friendInfo.userInfo.fullName ||
              conversationInfo.friendInfo.username}
          </div>
          <div className="sidebar-body__item-latest-message-wrap">
            <p className="sidebar-body__item-latest-message">
              {lastestMessage?.lastestMessage?.text}
            </p>
          </div>
        </div>
        <div className="sidebar-body__item-notifications">
          <div className="sidebar-body__item-notifications-message-count-container">
            <div className="sidebar-body__item-notifications-message-count">3</div>
          </div>
          <div className="sidebar-body__item-notifications-message-time">
            {(conversationInfo.friendInfo._id === lastMessage?.senderId &&
              format(lastMessage?.sendingTime)) ||
              format(lastestMessage && lastestMessage?.lastestMessage?.sendingTime)}
          </div>
        </div>
      </div>
    </div>
  );
}
