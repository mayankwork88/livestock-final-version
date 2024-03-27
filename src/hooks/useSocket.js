import io from "socket.io-client";

const useSocket = () => {
  const socket = io("http://localhost:8085/",{transports:["websocket"]});
  return socket;
};

export default useSocket;
