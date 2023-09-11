import { Link, useNavigate } from "react-router-dom";
import socket from "../socket";

export default function Logout() {
  const navigate = useNavigate()

  const handleClick = () => {
    localStorage.clear();
    socket.disconnect();
    console.log('Logged out')
    navigate('/login')
  };

  return (
    <main className="bg-slate-200 min-h-screen p-2 sm:p-8 flex items-center">
      <section className="bg-white rounded-xl w-11/12 sm:w-4/5 m-auto drop-shadow-md ">
        <header className="text-center p-4">
          <h1 className="text-cyan-500 text-4xl text-center p-4">Synapse</h1>
          <p className="pb-4 font-medium">Real-Time Messaging</p>
        </header>
        <p className="p-2 text-center">Are you sure you want to logout?</p>
        <div className="flex flex-col items-center justify-center p-4">
          <button onClick={handleClick} className="p-2 bg-cyan-500 text-white rounded-md">
            Logout
          </button>
          <Link to={'/'} className="p-2 pt-4 text-cyan-500 hover:underline underline-offset-4">Back to Synapse</Link>
        </div>
      </section>
    </main>
  );
}
