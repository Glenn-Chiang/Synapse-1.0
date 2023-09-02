import { NavLink } from "react-router-dom";
import { Chat } from "../../types";

export default function ChatPreview({chat}: {chat: Chat}) {
  const lastMessage =
    chat.messages.length > 0 &&
    chat.messages[chat.messages.length - 1];

  const currentUserId = localStorage.getItem('userId')
  const otherUser = chat.users.find(user => user.id !== currentUserId)

  return (
    <NavLink
      to={`/chats/${chat.id}`}
      className={({ isActive }) =>
        `p-2 h-20 w-full shadow flex gap-2 rounded-md ${
          isActive
            ? "bg-cyan-500 text-white "
            : "hover:text-slate-950 hover:shadow-md bg-white "
        }`
      }
    >
      <div className="flex flex-col justify-between w-4/5">
        <h2>{otherUser?.username}</h2>
        {lastMessage && <p className="line-clamp-1 py-1">{lastMessage.text}</p>}
      </div>
      <div className="flex flex-col justify-between items-end w-1/5">
        {lastMessage && <span>{lastMessage.timestamp}</span>}
        <span className="rounded-full bg-cyan-500 text-white w-8 h-8 flex justify-center items-center">
          {chat.messages.length}
        </span>
      </div>
    </NavLink>
  );
}