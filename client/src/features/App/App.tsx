import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import socket from "../../socket";
import TopNav from "../../components/TopNav";
import { useMessageSubscription } from "../../requests/messages";

export default function App() {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
      console.log('Connected')
    }
  }, []);
  
  useMessageSubscription(); // Listen to messages from the server

  return (
    <>
      <TopNav />
      <div className="pt-16">
        <Outlet />
      </div>
    </>
  );
}
