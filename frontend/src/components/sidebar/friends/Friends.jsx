import React, { useState, useEffect } from "react";
import "./friends.css";
import "../sidebar.css";
import { useSelector, useDispatch } from "react-redux";
import { useSocket } from "../../../services/Socket.js";
import {
  addFriendsAction,
  addFriendsOperationAction,
  getInvitedFriendsAction,
} from "../../../redux/actions/users.js";
import { setConversationAction } from "../../../redux/actions/chats.js";
import { activeFriendAction } from "../../../redux/actions/navbar.js";
import { PersonAdd, LocationOn, Check, Clear, Search, Send } from "@material-ui/icons";

export default function Friends({ friendRequestInfo, setCurrentChat }) {
  const dispatch = useDispatch();
  const socket = useSocket();
  const [friendsEmail, setFriendsEmail] = useState("");

  const addFriendInfo = useSelector((state) => state.addFriends.friendsInfo);
  const setConversation = useSelector((state) => state.setConversation);
  const addFriendsOperation = useSelector((state) => state.addFriendsOperation.friendsInfo);
  const user = useSelector((state) => state.authenticate.user);
  const friends = useSelector((state) => state.getFriends.friendsInfo);
  const activeFriend = useSelector((state) => state.activeFriend);

  const addFriends = () => {
    if (friendsEmail) {
      dispatch(addFriendsAction(friendsEmail));
    }
  };

  useEffect(() => {
    if (addFriendsOperation) {
      dispatch(getInvitedFriendsAction());
    }
  }, [addFriendsOperation, dispatch]);

  useEffect(() => {
    if (addFriendInfo?.success) {
      console.log(addFriendInfo?.friendRequestInfo);
      socket.emit("addFriends", {
        user,
        receiverId: addFriendInfo?.friendRequestInfo?._id,
      });
    }
  }, [addFriendInfo?.friendRequestInfo, addFriendInfo?.success, socket, user]);

  useEffect(() => {
    if (setConversation.success) {
      setCurrentChat({ show: true, data: setConversation.conversation });
    }
  }, [setConversation.conversation, setConversation.success, setCurrentChat]);

  return (
    <div className="friends">
      <header className="sidebar-header">
        <div className="sidebar-header__label">Friends</div>
        <div className="friends-add__btn">
          <PersonAdd />
        </div>
      </header>
      <div className="friends-add">
        <p>Add Friends</p>
        <div className="sidebar__input-wrap">
          <input
            placeholder="Enter  Email"
            className="sidebar__input"
            onChange={(e) => setFriendsEmail(e.target.value)}
          />
          <div onClick={addFriends}>
            <Send className="sidebar-icon" />
          </div>
        </div>
      </div>
      <div className="sidebar-search hidden">
        <div className="sidebar__input-wrap">
          <input type="text" placeholder="Search friends" className="sidebar__input" />
          <div>
            <Search className="sidebar-icon" />
          </div>
        </div>
      </div>
      {friendRequestInfo?.length ? (
        <div className="friends-request">
          <h5>Friends Request</h5>
          {friendRequestInfo?.map((reqInfo, index) => (
            <div className="friends-request__item" key={index}>
              <div className="friends-request__item-info">
                <img src={reqInfo.userInfo.avatar} alt="" />
                <p>{reqInfo.userInfo.fullName || reqInfo.username}</p>
              </div>
              <div className="friends-request__item-action">
                <div
                  className="friends-request__item-action--accept friends-request__item-btn"
                  onClick={() =>
                    dispatch(
                      addFriendsOperationAction({ action: "accept", friendEmail: reqInfo.email })
                    )
                  }
                >
                  <Check />
                </div>
                <div
                  className="friends-request__item-action--reject friends-request__item-btn"
                  onClick={() =>
                    dispatch(
                      addFriendsOperationAction({ action: "reject", friendEmail: reqInfo.email })
                    )
                  }
                >
                  <Clear />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      {(addFriendsOperation?.friendsInfo || friends)?.map((friend, index) => (
        <div className="friends-body" key={index}>
          <div className="friends-list">
            <div>
              <div
                className={`friends-list__item ${
                  activeFriend === friend._id ? "sidebar-body-item__active" : ""
                }`}
                onClick={() => {
                  dispatch(
                    setConversationAction({
                      name: "",
                      arrayMembers: [friend._id, user._id],
                    })
                  );
                  dispatch(activeFriendAction(friend._id));
                }}
              >
                <img src={friend.userInfo.avatar} alt="" />
                <div className="friends-list__item-info">
                  <p>{friend.userInfo.fullName || friend.username}</p>
                  <div className="friends-list__item-info-location">
                    <LocationOn />
                    <h5>{friend.userInfo.location}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
