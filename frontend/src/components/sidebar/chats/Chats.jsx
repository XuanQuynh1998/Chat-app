import React, { useEffect, useState } from "react";
import "../sidebar.css";
import "./chats.css";
import Conversation from "../../conversation/Conversation.jsx";
import GroupChats from "../../chat/group_chats/GroupChats.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getConversationAction, getLastestMessagesAction } from "../../../redux/actions/chats.js";
import { activeConversationAction } from "../../../redux/actions/navbar.js";
import { PeopleAlt, AddCircle } from "@material-ui/icons";
import { useSocket } from "../../../services/Socket.js";

export default function Chats({ setCurrentChat }) {
  const dispatch = useDispatch();
  const socket = useSocket();

  const [groupChats, setGroupChats] = useState(false);

  const getConversationState = useSelector((state) => state.getConversation);
  const activeConversation = useSelector((state) => state.activeConversation);
  const user = useSelector((state) => state.authenticate.user);
  const getLastestMessagesState = useSelector((state) => state.getLastestMessages);

  useEffect(() => {
    socket?.emit("addUser", user._id);
  }, [socket, user]);

  useEffect(() => {
    dispatch(getConversationAction(user._id));
    dispatch(getLastestMessagesAction());
  }, [dispatch, user._id]);

  const toggleActiveConversation = (conversationInfo) => {
    dispatch(activeConversationAction(conversationInfo.conversation._id));
  };

  return (
    <div>
      <header className="sidebar-header">
        <div className="sidebar-header__label">Chats</div>
        <div className="create-chat">
          <div className="create-chat--new-group-chat">
            <div
              className="create-chat-btn"
              data-placement="bottom"
              data-original-title="Add group"
              onClick={() => setGroupChats(true)}
            >
              <PeopleAlt className="create-chat__icon" />
            </div>
          </div>
          <div className="create-chat--new-chat">
            <a href="/" title="create-chat" className="create-chat-btn">
              <AddCircle className="create-chat__icon" />
            </a>
          </div>
        </div>
      </header>
      <div className="sidebar-search">
        <input type="text" placeholder="Search chats" className="sidebar__input" />
      </div>
      <div className="sidebar-body">
        {getConversationState?.conversations?.map((conversation, index) => (
          <div
            key={index}
            onClick={() => {
              setCurrentChat({ data: conversation, show: true });
              toggleActiveConversation(conversation);
            }}
            className={
              activeConversation === conversation.conversation._id
                ? "sidebar-body-item__active"
                : ""
            }
          >
            <Conversation
              conversationInfo={conversation}
              lastestMessage={getLastestMessagesState?.messagesInfo?.find(
                (m) => m.conversationId === conversation.conversation._id
              )}
            />
          </div>
        ))}
      </div>
      {groupChats && <GroupChats setGroupChats={setGroupChats} />}
    </div>
  );
}
