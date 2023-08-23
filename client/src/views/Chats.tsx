import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function Chats() {
  return (
    <main>
      <h1 className="w-screen p-2 flex items-center gap-2 shadow">
        <FontAwesomeIcon icon={faCommentDots} />
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

export default Chats;
