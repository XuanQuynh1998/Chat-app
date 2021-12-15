import React, { useEffect, useState } from "react";
import "./home.css";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import Chat from "../../components/chat/Chat.jsx";
import Account from "../../components/account/Account.jsx";
import Setting from "../../components/setting/Setting.jsx";
import Call from "../../components/chat/call/Call.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useSocket } from "../../services/Socket.js";
import { activeCallAction } from "../../redux/actions/call.js";

export default function Home() {
  const rightbarState = useSelector((state) => state.rightbar);
  const activeCall = useSelector((state) => state.activeCall);

  const socket = useSocket();
  const dispatch = useDispatch();

  const [currentChat, setCurrentChat] = useState({
    show: false,
    data: null,
  });
  const [roomId, setRoomId] = useState();

  useEffect(() => {
    socket?.on("receivingCall", ({ members, calleeInfo, callType, roomId }) => {
      setRoomId(roomId);
      dispatch(activeCallAction({ show: true, calleeInfo, callType, members }));
    });
  }, [dispatch, socket]);

  return (
    <div className="home-container">
      <Navbar />
      <Sidebar setCurrentChat={setCurrentChat} />
      {currentChat.show && <Chat conversationInfo={currentChat.data} />}
      <div className="right-bar">
        {rightbarState.showProfile && <Account />}
        {rightbarState.showSettings && <Setting />}
      </div>
      {activeCall.show && (
        <Call
          members={activeCall.members}
          calleeInfo={activeCall.calleeInfo}
          receivingInfo={activeCall.receivingInfo}
          roomId={roomId}
        />
      )}
    </div>
  );
}
