import { NavLink } from "react-router-dom";
import { Channel } from "../../types";

export default function ChannelPreview({ channel }: { channel: Channel }) {
  const unreadCount = channel.messages.filter(message => !message.isRead).length
  
  const lastMessage =
    channel.messages.length > 0 &&
    channel.messages[channel.messages.length - 1];

    return (
    <NavLink
      to={`/channels/${channel.id}`}
      className={({ isActive }) =>
        `p-2 h-20 w-full shadow flex gap-2 rounded-md ${
          isActive
            ? "bg-cyan-500 text-white "
            : "hover:text-slate-950 hover:shadow-md bg-white "
        }`
      }
    >
      <div className="flex flex-col justify-between w-4/5">
        <h2>{channel.name}</h2>
        {lastMessage && <p className="line-clamp-1 py-1">{lastMessage.text}</p>}
      </div>
      <div className="flex flex-col justify-between items-end w-1/5">
        {lastMessage && <span>{lastMessage.timestamp}</span>}
        {unreadCount > 0 && <span className="bg-cyan-400 text-white rounded-full w-8 h-8 flex justify-center items-center">{unreadCount}</span>}
      </div>
    </NavLink>
  );
}
