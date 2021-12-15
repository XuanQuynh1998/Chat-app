import React, { useState, useRef, useEffect, useCallback } from "react";
import { useSocket } from "../../../services/Socket.js";
import { useSelector, useDispatch } from "react-redux";
import { activeCallAction } from "../../../redux/actions/call.js";
// import { useInterval } from "../../../utils/Others.js";
import Peer from "simple-peer";
import { Videocam, Mic, CallEnd, MicOff, VideocamOff } from "@material-ui/icons";
import "./call.css";
import IncomingCall from "../../incomingCall/IncomingCall.jsx";

const Video = (props) => {
  const ref = useRef();
  useEffect(() => {
    props.peer.on("stream", (stream) => {
      if (ref.current) {
        ref.current.srcObject = stream;
      }
    });
  }, [props.peer]);

  return props.callType === "video" ? <video autoPlay ref={ref} /> : <audio autoPlay ref={ref} />;
};

export default function Call({ members, calleeInfo, receivingInfo, roomId }) {
  const dispatch = useDispatch();
  const socket = useSocket();

  const [stream, setStream] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [pauseCamera, setPauseCamera] = useState(false);
  const [pauseMicro, setPauseMicro] = useState(false);
  const [peers, setPeers] = useState([]);
  // const [timer, setTimer] = useState(0);
  // const [runningTimer, setRunningTimer] = useState(false);

  const userMedia = useRef();
  const peersRef = useRef([]);
  const mountRef = useRef(false);

  const userInfo = useSelector((state) => state.authenticate.user);
  const callType = useSelector((state) => state.activeCall.callType);
  const roomID = useSelector((state) => state.activeCall.roomId);

  const createPeer = useCallback(
    (userToSignal, callerID, stream) => {
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream,
      });

      peer.on("signal", (signal) => {
        socket.emit("sendingSignal", { userToSignal, callerID, signal });
      });

      return peer;
    },
    [socket]
  );

  const addPeer = useCallback(
    (incomingSignal, callerID, stream) => {
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream,
      });

      peer.on("signal", (signal) => {
        socket.emit("returningSignal", { signal, callerID });
      });

      peer.signal(incomingSignal);
      return peer;
    },
    [socket]
  );

  useEffect(() => {
    if (callAccepted || !calleeInfo) {
      mountRef.current = true;
      navigator.mediaDevices
        .getUserMedia({ video: callType === "video" ? true : false, audio: true })
        .then((stream) => {
          if (!calleeInfo) {
            socket.emit("callUser", { members, userInfo, callType, roomId: roomID });
            //caller
          }

          setStream(stream);
          userMedia.current.srcObject = stream;
          socket.emit("joinRoom", { userId: userInfo._id, roomId: roomId || roomID });
          socket.on("callAccepted", (users) => {
            const peers = [];
            users.forEach((member) => {
              const peer = createPeer(member, userInfo._id, stream);
              peersRef.current.push({
                peerID: member,
                peer,
              });
              console.log(member);
              peers.push(peer);
            });
            if (mountRef.current) {
              setPeers(peers);
            }
          });

          socket.on("userJoined", (payload) => {
            const peer = addPeer(payload.signal, payload.callerID, stream);
            peersRef.current.push({
              peerID: payload.callerID,
              peer,
            });
            if (mountRef.current) {
              setPeers((users) => [...users, peer]);
            }
          });

          socket.on("receivingReturnedSignal", (payload) => {
            if (mountRef.current) {
              const item = peersRef.current.find((p) => p.peerID === payload.id);
              if (!item.peer.destroyed) {
                item.peer.signal(payload.signal);
              }
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return () => {
      mountRef.current = false;
      // peersRef.current = [];
      // setPeers([]);
      // setCallAccepted(false);
    };
  }, [
    addPeer,
    callAccepted,
    callType,
    calleeInfo,
    createPeer,
    members,
    roomID,
    roomId,
    socket,
    userInfo,
  ]);

  const acceptCall = () => {
    setCallAccepted(true);
  };

  const stopMedia = ({ type }) => {
    if (type === "micro") {
      stream.getTracks()[0].enabled = pauseMicro;
      setPauseMicro(!pauseMicro);
    }
    if (type === "camera") {
      stream.getTracks()[1].enabled = pauseCamera;
      setPauseCamera(!pauseCamera);
    }
  };

  const stopCall = () => {
    dispatch(activeCallAction({ show: false }));
    stream?.getTracks()?.forEach((track) => {
      track.stop();
    });
    peersRef.current.forEach((peerRef) => peerRef.peer.destroy());
    peersRef.current = [];
    setPeers([]);

    socket.emit("stopCall", {
      members: members.filter((member) => member !== userInfo._id),
      stoppedId: userInfo._id,
      roomId: roomId || roomID,
    });
  };

  useEffect(() => {
    socket.on("callStopped", (stoppedId) => {
      if (stream) {
        const peerStopped = peersRef.current.find((peerRef) => peerRef.peerID === stoppedId);
        peerStopped.peer.destroy();
        peersRef.current = peersRef.current.filter((peerRef) => peerRef.peerID !== stoppedId);
        if (!peersRef.current.length) {
          setCallAccepted(false);
          stream.getTracks().forEach((track) => {
            track.stop();
          });
          dispatch(activeCallAction({ show: false }));
        }
      }
    });
  }, [dispatch, socket, stream]);

  return (
    <div className="modal">
      <div className="call">
        {calleeInfo && !callAccepted && (
          <IncomingCall
            calleeInfo={calleeInfo}
            stopCall={stopCall}
            acceptCall={acceptCall}
            callType={callType}
          />
        )}

        {(!calleeInfo || callAccepted) && (
          <div className={`call__main ${callType === "voice" ? "voice" : ""}`}>
            {callType === "voice" && (
              <div className="call__main-info">
                <img src={receivingInfo?.userInfo?.avatar || calleeInfo.userInfo.avatar} alt="" />
                <p>
                  {receivingInfo?.userInfo?.fullName ||
                    receivingInfo?.username ||
                    calleeInfo.userInfo.fullName ||
                    calleeInfo.username}
                </p>
              </div>
            )}
            <div className="call__main-caller">
              {callType === "video" ? (
                <video ref={userMedia} autoPlay />
              ) : (
                <audio ref={userMedia} autoPlay />
              )}
            </div>
            <div className="call__main-callee">
              {peers.map((peer, index) => {
                return <Video key={index} peer={peer} callType={callType} />;
              })}
            </div>
            <div className="call__main-group-btn">
              {callType === "video" && (
                <div className="call__main-btn" onClick={() => stopMedia({ type: "camera" })}>
                  {pauseCamera ? <VideocamOff /> : <Videocam />}
                </div>
              )}
              <div className="call__main-btn" onClick={() => stopMedia({ type: "micro" })}>
                {pauseMicro ? <MicOff /> : <Mic />}
              </div>
              <div className="call__main-btn" onClick={stopCall}>
                <CallEnd />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
