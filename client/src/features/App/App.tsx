import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import socket from "../../socket";
import TopNav from "../../components/TopNav";

export default function App() {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
      console.log('Connected')
    }
  }, []);

  return (
    <>
      <TopNav />
      <div className="pt-16">
        <Outlet />
      </div>
    </>
  );
}
