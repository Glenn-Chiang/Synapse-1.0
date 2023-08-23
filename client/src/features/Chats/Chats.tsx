import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chat } from "../../types";
import { Link, Outlet } from "react-router-dom";

function Chats() {
  const chats: Chat[] = [
    {
      id: "1",
      users: [
        {
          id: "1",
          username: "Glenn",
        },
        {
          id: "2",
          username: "024GHOST",
        },
      ],
      messages: [
        {
          id: "1",
          text: "message 1 message message 1 message 1kkpppppppppppppzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz",
          sender: {
            id: "1",
            username: "Glenn",
          },
          recipient: {
            id: "2",
            username: "024GHOST",
          },
          timeStamp: new Date(),
        },
      ],
    },
    {
      id: "2",
      users: [
        {
          id: "1",
          username: "Glenn",
        },
        {
          id: "2",
          username: "024GHOST",
        },
      ],
      messages: [
        {
          id: "1",
          text: "message 1",
          sender: {
            id: "1",
            username: "Glenn",
          },
          recipient: {
            id: "2",
            username: "024GHOST",
          },
          timeStamp: new Date(),
        },
      ],
    },
    {
      id: "3",
      users: [
        {
          id: "1",
          username: "Glenn",
        },
        {
          id: "2",
          username: "024GHOST",
        },
      ],
      messages: [
        {
          id: "1",
          text: "message 1",
          sender: {
            id: "1",
            username: "Glenn",
          },
          recipient: {
            id: "2",
            username: "024GHOST",
          },
          timeStamp: new Date(),
        },
      ],
    },
  ];

  return (
    <main>
      <h1 className="w-full p-2 flex items-center gap-2 shadow text-cyan-500">
        <FontAwesomeIcon icon={faCommentDots} />
        Chats
      </h1>
      <ChatList chats={chats} />
      <div className="">
        <Outlet />
      </div>
    </main>
  );
}

type ChatListProps = {
  chats: Chat[];
};
function ChatList({ chats }: ChatListProps) {
  return (
    <ul>
      {chats.map((chat) => (
        <li key={chat.id}>
          <ChatPreview chat={chat} />
        </li>
      ))}
    </ul>
  );
}

type ChatPreviewProps = {
  chat: Chat;
};

function ChatPreview({ chat }: ChatPreviewProps) {
  const lastMessage = chat.messages[chat.messages.length - 1];
  return (
    <Link
      to={`/chats/${chat.id}`}
      className="p-2 h-20 w-full shadow flex gap-2 hover:bg-slate-200"
    >
      <div className="flex flex-col justify-between w-4/5">
        <h2>{chat.users[1].username}</h2>
        <p className="line-clamp-1 py-1">{lastMessage.text}</p>
      </div>
      <div className="flex flex-col justify-between items-end w-1/5">
        <span>{lastMessage.timeStamp.toLocaleTimeString().split(" ")[0]}</span>
        <span className="rounded-full bg-cyan-500 text-white w-8 h-8 flex justify-center items-center">
          {chat.messages.length}
        </span>
      </div>
    </Link>
  );
}

export default Chats;
