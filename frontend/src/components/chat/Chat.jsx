import React, { useEffect, useState } from "react";
import "./chat.css";
import Message from "../message/Message.jsx";
import Loading from "../loading/Loading.jsx";
import { useSelector, useDispatch } from "react-redux";
import {
  getMessagesAction,
  sendMessagesAction,
  getLastestMessagesAction,
} from "../../redux/actions/chats";
import { activeCallAction } from "../../redux/actions/call.js";
import { useSocket } from "../../services/Socket.js";

import {
  PhoneOutlined,
  VideocamOutlined,
  MoreHoriz,
  EmojiEmotionsOutlined,
  AttachFileOutlined,
  Telegram,
  Cancel,
  InsertDriveFile,
  PlayCircleOutline,
} from "@material-ui/icons";

export default function Chat({ conversationInfo }) {
  const dispatch = useDispatch();
  const socket = useSocket();

  const getMessagesState = useSelector((state) => state.getMessages);
  const sendMessagesState = useSelector((state) => state.sendMessages);
  const user = useSelector((state) => state.authenticate.user);
  const lastestMessages = useSelector((state) => state.getLastestMessages.messagesInfo);

  const [newMessage, setNewMessage] = useState("");
  const [sendFiles, setSendFiles] = useState([]);
  const [preview, setPreview] = useState([]);
  const [socketMessage, setSocketMessage] = useState(null);

  const selectFiles = (files) => {
    const fileInfo = files?.map((file) => {
      switch (file.type.split("/")[0]) {
        case "image":
          return { type: "image", url: URL.createObjectURL(file), name: file.name };
        case "video":
          return { type: "video", url: URL.createObjectURL(file), name: file.name };
        default:
          return { type: "file", url: "", name: file.name };
      }
    });
    setPreview([...preview, ...fileInfo]);
    setSendFiles([...sendFiles, ...files]);
  };

  const createFileElement = (file) => {
    switch (file.type) {
      case "image":
        return <img src={file.url} alt="" className="chat-footer__input-images" />;
      case "video":
        return (
          <div className="chat-footer__input-video">
            <PlayCircleOutline className="chat-footer__input-video-icon" />
            <video>
              <source src={file.url} />
            </video>
          </div>
        );
      default:
        return (
          <div className="chat-footer__preview-file">
            <InsertDriveFile />
            <p>{file.name}</p>
          </div>
        );
    }
  };

  const removeFile = (file) => {
    setSendFiles(sendFiles.filter((sendFile) => sendFile.name !== file.name));
    setPreview(preview.filter((filePreview) => filePreview !== file));
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage || sendFiles.length) {
      const formData = new FormData();
      const conversationId = conversationInfo.conversation._id;
      formData.append("senderId", user._id);
      formData.append("text", newMessage);
      formData.append("conversationId", conversationId);
      sendFiles.forEach((file) => formData.append("file", file));

      dispatch(sendMessagesAction(formData));

      const lastestMessage = lastestMessages?.map((message) => {
        if (message.conversationId === conversationId) {
          return {
            conversationId: conversationId,
            lastestMessage: { text: newMessage, senderId: user._id, sendingTime: Date.now() },
          };
        }
        return message;
      });
      dispatch(getLastestMessagesAction(lastestMessage));
    }
    preview?.forEach((img) => URL.revokeObjectURL(img));
  };

  useEffect(() => {
    if (sendMessagesState.success) {
      const receiverId = conversationInfo.conversation.members.filter(
        (member) => member !== user._id
      );
      const lastestMessage = sendMessagesState.messagesInfo.slice(-1)[0];
      const conversationId = conversationInfo.conversation._id;
      lastestMessage["receiverId"] = receiverId;
      lastestMessage["conversationId"] = conversationId;
      lastestMessage.sendingTime !== setSocketMessage?.sendingTime
        ? setSocketMessage(lastestMessage)
        : setSocketMessage(null);
    }
  }, [
    conversationInfo.conversation._id,
    conversationInfo.conversation.members,
    sendMessagesState.messagesInfo,
    sendMessagesState.success,
    user._id,
  ]);

  useEffect(() => {
    if (socketMessage) {
      socket.emit("sendMessage", socketMessage);
    }
  }, [socket, socketMessage]);

  useEffect(() => {
    dispatch(getMessagesAction(conversationInfo.conversation._id));
  }, [conversationInfo.conversation._id, dispatch]);

  if (getMessagesState.loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="chat">
        <div className="chat-header">
          <div className="chat-header__user">
            <div className="chat-header__user-avatar">
              <img
                className="chat-header__user-avatar-img"
                src={conversationInfo.friendInfo.userInfo.avatar}
                alt=""
              />
            </div>
            <div className="chat-header__user-info">
              <div className="chat-header__user-info-name">
                {conversationInfo.conversation.name ||
                  conversationInfo.friendInfo.userInfo.fullName ||
                  conversationInfo.friendInfo.username}
              </div>
              <div className="chat-header__user-action">Writing...</div>
            </div>
          </div>
          <div className="chat-action">
            <div className="chat-action__phone">
              <div
                data-placement="bottom"
                data-original-title="Voice call"
                className="chat-action__btn"
                onClick={
                  () =>
                    dispatch(
                      activeCallAction({
                        callType: "voice",
                        show: true,
                        members: conversationInfo.conversation.members,
                        roomId: conversationInfo.conversation._id,
                        receivingInfo: conversationInfo.friendInfo,
                      })
                    )
                  // window.open(
                  //   "/test",
                  //   "_blank",
                  //   "location=yes,height=%100,width=%100,left=0,location=0,scrollbars=yes,status=yes"
                  // )
                }
              >
                <PhoneOutlined className="chat-action__icon chat-action__phone-icon" />
              </div>
            </div>
            <div className="chat-action__video">
              <div
                data-placement="bottom"
                data-original-title="Video call"
                className="chat-action__btn"
                onClick={() =>
                  dispatch(
                    activeCallAction({
                      callType: "video",
                      show: true,
                      members: conversationInfo.conversation.members,
                      roomId: conversationInfo.conversation._id,
                      receivingInfo: conversationInfo.friendInfo,
                    })
                  )
                }
              >
                <VideocamOutlined className="chat-action__icon chat-action__video-icon" />
              </div>
            </div>
            <div className="chat-action__more">
              <div data-placement="bottom" data-original-title="More" className="chat-action__btn">
                <MoreHoriz className="chat-action__icon chat-action__more-icon" />
              </div>
            </div>
          </div>
        </div>
        <div className="chat-body">
          <div className="chat-body__container">
            <Message
              messagesInfo={getMessagesState.messagesInfo || []}
              friendInfo={conversationInfo.friendInfo}
              conversationId={conversationInfo.conversation._id}
            />
          </div>
        </div>
        <div className="chat-footer">
          <div className="chat-footer__emoji">
            <a href="/" className="chat-footer__btn">
              <EmojiEmotionsOutlined className="chat-footer__icon" />
            </a>
          </div>
          <div className="chat-footer__input-message">
            <div>
              {preview.map((file, index) => (
                <div key={index} className="chat-footer__input-file-wrap">
                  <div className="chat-footer__input-remove-file" onClick={() => removeFile(file)}>
                    <Cancel className="chat-footer__input-remove-file-icon" />
                  </div>
                  {createFileElement(file)}
                </div>
              ))}
            </div>

            <p
              contentEditable="true"
              className="chat-footer__input"
              onInput={(e) => setNewMessage(e.currentTarget.textContent)}
            />
          </div>
          <div className="chat-footer__add-files">
            <label className="chat-footer__btn">
              <input
                type="file"
                multiple
                className="chat-footer__input-file"
                onChange={(e) => {
                  selectFiles([...e.target.files]);
                  e.target.value = null; //accept select duplicate files
                }}
              />
              <AttachFileOutlined className="chat-footer__icon" />
            </label>
          </div>
          <div className="chat-footer__send-message">
            <a href="/" className="chat-footer__btn" onClick={sendMessage}>
              <Telegram className="chat-footer__icon" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
