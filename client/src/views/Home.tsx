import { faBoltLightning, faCommentDots, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main>
      <TopNav />
      <h1 className="w-screen p-2 flex items-center gap-2 shadow">
        <FontAwesomeIcon icon={faCommentDots}/>
        Chats
      </h1>
      <nav className="flex gap-2 p-2">
        {/* <Link to={'/'} className="bg-cyan-500/50 rounded-xl p-2">All</Link>
        <Link to={'/'} className="bg-cyan-600/50 rounded-xl p-2">Direct</Link>
        <Link to={'/'} className="bg-cyan-600/50 rounded-xl p-2">Groups</Link> */}
      </nav>
    </main>
  );
}

function TopNav() {
  return (
    <nav className="fixed top-0 left-0 w-screen h-16 flex items-center justify-between bg-cyan-500 text-white p-4 text-2xl">
      <Link to={"/"}>
        <h1 className="flex gap-2 items-center text-white">
          <FontAwesomeIcon icon={faBoltLightning} />
          Synapse
        </h1>
      </Link>
      <Link to={'/profile'}>
        <h1 className="text-white">
          <FontAwesomeIcon icon={faUserCircle}/>
        </h1>
      </Link>
    </nav>
  );
}

export default Home;
