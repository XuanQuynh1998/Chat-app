import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";

const SocketContext = createContext();
export const useSocket = () => {
  return useContext(SocketContext);
};

export default function SocketProvider({ children }) {
  const [socket, setSocket] = useState();
  const userState = useSelector((state) => state.authenticate.user);

  useEffect(() => {
    if (userState) {
      const newSocket = io.connect("ws://localhost:5000", {
        reconnect: true,
        transport: ["websocket"],
      });
      setSocket(newSocket);

      return () => newSocket.close();
    }
  }, [userState]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
