import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setConversationAction } from "../../../redux/actions/chats.js";
import "./groupChats.css";
import { GroupAdd, Close, EmojiEmotionsOutlined, Search, Check } from "@material-ui/icons";

export default function GroupChats({ setGroupChats }) {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.getFriends.friendsInfo);
  const user = useSelector((state) => state.authenticate.user);

  const [groupMembers, setGroupMembers] = useState([]);
  const [conversationName, setConversationName] = useState(null);

  const selectMember = ({ selected, friend }) => {
    if (selected === true) {
      if (!groupMembers?.some((member) => member._id === friend._id)) {
        setGroupMembers([...groupMembers, friend]);
      }
    } else {
      const members = groupMembers.filter((member) => member._id !== friend._id);
      setGroupMembers(members);
    }
  };

  const addGroupChats = () => {
    const arrayMembers = groupMembers.map((member) => member._id);
    dispatch(
      setConversationAction({ name: conversationName, arrayMembers: [...arrayMembers, user._id] })
    );
  };

  return (
    <div className="modal">
      <div className="modal-body">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-header__text">
              <GroupAdd className="add-group__header-icon" />
              <h5>Add Group</h5>
            </div>
            <button className="modal-close-btn" onClick={() => setGroupChats(false)}>
              <Close className="modal-close-btn__icon" />
            </button>
          </div>
          <div className="group-chats">
            <div className="group-chats-item">
              <h5>Group name</h5>
              <div className="group-chats-item__input">
                <input type="text" onChange={(e) => setConversationName(e.target.value)} />
                <div className="group-chats-item__input-icon-wrap">
                  <EmojiEmotionsOutlined className="group-chats-item__input-icon" />
                </div>
              </div>
            </div>
            <div className="group-chats-item">
              <h5>The group members</h5>
              <div className="group-chats-item__add-members">
                {groupMembers?.map((member, index) => (
                  <div
                    className="group-chats-item__members"
                    key={index}
                    data-placement="top"
                    data-original-title={member.userInfo.fullName || member.username}
                  >
                    <img
                      className="group-chats-item__members-avatar"
                      src={member.userInfo.avatar}
                      alt=""
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="group-chat__friends">
              <h5>Search for friends</h5>
              <div className="group-chats-item__input">
                <input type="text" />
                <div className="group-chats-item__input-icon-wrap">
                  <Search className="group-chats-item__input-icon" />
                </div>
              </div>
              <div className="group-chat__list-friends-container">
                <div className="group-chat__list-friends">
                  {friends?.map((friend, index) => (
                    <div className="group-chat__list-friends-item" key={index}>
                      <div className="group-chat__friends-info">
                        <img src={friend.userInfo.avatar} alt="" />
                        <div>
                          <h4>{friend.userInfo.fullName || friend.username}</h4>
                          <p>{friend.userInfo.location}</p>
                        </div>
                      </div>
                      <label>
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          className="group-chat__select-member"
                          onChange={(e) => selectMember({ selected: e.target.checked, friend })}
                        />
                        <div className="custom-checkbox"></div>
                        <Check className="custom-checkbox-icon" />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-footer__btn-submit" onClick={addGroupChats}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
