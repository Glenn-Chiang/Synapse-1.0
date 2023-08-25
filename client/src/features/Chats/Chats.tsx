import { faCommentDots, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chat } from "../../types";
import { Link, Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

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

  const [filterShown, setFilterShown] = useState(false);

  return (
    <main>
      <div className="w-full p-2 flex items-center justify-between gap-2 shadow">
        <h1 className="flex gap-2 items-center text-cyan-500">
          <FontAwesomeIcon icon={faCommentDots} />
          Chats
        </h1>
        <button onClick={() => setFilterShown((prev) => !prev)} className="p-2 rounded-full w-10 hover:bg-slate-200">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      {filterShown && <SearchBar />}
      <ChatList chats={chats} />
      <div className="">
        <Outlet />
      </div>
    </main>
  );
}

function SearchBar() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <input
        ref={inputRef}
        className="w-full p-4 bg-slate-100 shadow-inner focus:outline-none"
        placeholder="Search your chats..."
      />
    </div>
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
