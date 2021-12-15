import React from "react";
import "./incomingCall.css";
import { Videocam, Phone, Close } from "@material-ui/icons";

export default function IncomingCall({ calleeInfo, stopCall, acceptCall, callType }) {
  return (
    <div className="incoming-call__callee">
      <div className="incoming-call-avatar">
        <img src={calleeInfo.userInfo.avatar} alt="" />
      </div>
      <h5>{calleeInfo.userInfo.fullName || calleeInfo.username}</h5>
      <p>{callType === "video" ? "Start Video Call" : "Start Voice Call"}</p>
      <div className="incoming-call-group-btn">
        <div className="incoming-call-btn" onClick={acceptCall}>
          {callType === "video" ? <Videocam /> : <Phone />}
        </div>
        <div className="incoming-call-btn" onClick={stopCall}>
          <Close />
        </div>
      </div>
    </div>
  );
}
