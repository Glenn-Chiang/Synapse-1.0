import { Link } from "react-router-dom";
import { Chat } from "../types";

export default function ChatPreview({ chat }: { chat: Chat }) {
  const currentUserId = localStorage.getItem("userId");
  const username = chat.users.find(
    (user) => user.id !== currentUserId
  )?.username;
  const lastMessage =
  chat.messages.length > 0 && chat.messages[chat.messages.length - 1];  

  return (
    <Link
      to={`/chats/${chat.id}/${username}`}
      className="p-2 h-20 w-full shadow flex gap-2 hover:bg-slate-200"
    >
      <div className="flex flex-col justify-between w-4/5">
        <h2>{username}</h2>
        {lastMessage && <p className="line-clamp-1 py-1">{lastMessage.text}</p>}
      </div>
      <div className="flex flex-col justify-between items-end w-1/5">
        {lastMessage && <span>{lastMessage.timestamp}</span>}
        <span className="rounded-full bg-cyan-500 text-white w-8 h-8 flex justify-center items-center">
          {chat.messages.length}
        </span>
      </div>
    </Link>
  );
}
