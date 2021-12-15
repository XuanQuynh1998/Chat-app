import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { format } from "timeago.js";
import { getMessagesAction } from "../../redux/actions/chats";
import { useSocket } from "../../services/Socket.js";
import FileSaver from "file-saver";
import DisplayImages from "../displayImages/DisplayImages.jsx";
import "./message.css";
import "../chat/chat.css";
import { InsertDriveFile } from "@material-ui/icons";

export default function Message({ messagesInfo, friendInfo, conversationId }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authenticate.user);
  const scrollRef = useRef();
  const socket = useSocket();

  const [displayImages, setDisplayImages] = useState({
    show: false,
    image: null,
  });

  useEffect(() => {
    socket.on("getMessage", (message) => {
      if (messagesInfo) {
        if (conversationId === message.conversationId) {
          dispatch(getMessagesAction(null, { messages: [...messagesInfo, message] }));
        }
      }
    });
  }, [socket, dispatch, messagesInfo, conversationId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  }, [messagesInfo]);

  return (
    <>
      {messagesInfo?.map((message, index) => (
        <div key={index} ref={scrollRef}>
          <div
            className={`chat-body__item ${
              message.senderId === user._id ? "outgoing-message " : ""
            } `}
          >
            <div className="chat-body__item-info">
              <div className="chat-body__item-info-avatar">
                <img
                  className="chat-body__item-info-avatar-img"
                  src={
                    message.senderId === user._id
                      ? user.userInfo.avatar
                      : friendInfo.userInfo.avatar
                  }
                  alt=""
                />
              </div>
              <div className="chat-body__item-info-details">
                <div className="chat-body__item-info-details-name">
                  {message.senderId === user._id
                    ? user.userInfo.fullName || user.username
                    : friendInfo.userInfo.fullName || friendInfo.username}
                </div>
                <div className="chat-body__item-info-details-time">
                  <h5>{format(message.sendingTime)}</h5>
                </div>
              </div>
            </div>
            {message.text && <div className="chat-body__item-message">{message.text}</div>}
            {message?.files?.raws?.map((file, index) => (
              <div
                key={index}
                className="chat-body__item-message file"
                onClick={() => FileSaver.saveAs(file.fileUrl, file.fileName)}
              >
                <InsertDriveFile />
                <p>{file.fileName}</p>
              </div>
            ))}

            {message?.files?.images && (
              <div className="chat-body__item-message image">
                {message?.files?.images?.map((file, index) => (
                  <div
                    key={index}
                    onClick={() => setDisplayImages({ show: !displayImages.show, image: file })}
                    className="chat-body__item-message-image-wrap"
                  >
                    <img src={file.fileUrl} alt="" className="chat-body__item-message-image" />
                    <div className="chat-body__item-message-layout" />
                  </div>
                ))}
              </div>
            )}

            {message?.files?.audio?.map((file, index) => (
              <div key={index} className="chat-body__item-message audio">
                <audio controls loop muted>
                  <source src={file.fileUrl} />
                </audio>
              </div>
            ))}

            {message?.files?.videos?.map((file, index) => (
              <div
                key={index}
                className="chat-body__item-message video"
                onClick={() => setDisplayImages({ show: !displayImages.show, image: file })}
              >
                <video controls loop muted>
                  <source src={file.fileUrl} />
                </video>
              </div>
            ))}
          </div>
        </div>
      ))}
      {displayImages.show && (
        <DisplayImages
          image={displayImages.image}
          setDisplayImages={setDisplayImages}
          conversationId={conversationId}
        />
      )}
    </>
  );
}
