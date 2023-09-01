import { Outlet } from "react-router-dom";
import { useState, useEffect } from 'react';
import socket from "./socket";
import TopNav from "./components/TopNav";
import { Message } from "./types";
import { useQueryClient } from 'react-query';

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const queryClient = useQueryClient();

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true)
      console.log('Connected')
    }

    const onDisconnect = () => {
      setIsConnected(false)
      console.log('Disconnected')
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on("message:create", (message: Message) => {
      console.log("message received");
      queryClient.invalidateQueries([
        "channels",
        message.channelId,
        "messages",
      ]);
    });


    socket.connect()

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, [])

  return (
    <>
      <TopNav/>
      <div className="pt-16">
        <Outlet />
      </div>
    </>
  );
}
