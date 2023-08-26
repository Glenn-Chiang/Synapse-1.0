import { faCommentDots, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chat } from "../../types";
import { Link } from "react-router-dom";
import { useState } from "react";
import SearchBar from "../../components/Searchbar";
import { useQuery } from "react-query";
import { getChats } from "../../requests/chats";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

function Chats() {
  const userId = localStorage.getItem("userId") as string;

  const {
    isLoading,
    isError,
    data: chats,
  } = useQuery({
    queryKey: ["chats", "userId"],
    queryFn: () => getChats(userId),
  });

  const [filterShown, setFilterShown] = useState(false);

  return (
    <main className="bg-white">
      <div className="w-full p-2 flex items-center justify-between gap-2 shadow">
        <h1 className="flex gap-2 items-center text-cyan-500">
          <FontAwesomeIcon icon={faCommentDots} />
          Chats
        </h1>
        <button
          onClick={() => setFilterShown((prev) => !prev)}
          className="p-2 rounded-full w-10 hover:bg-slate-200"
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      {filterShown && <SearchBar placeholder="Search your chats..." />}
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorMessage message="Error fetching users" />
      ) : (
        chats && chats.length > 0 ?
        <ul>
          {chats?.map((chat) => (
            <li key={chat.id}>
              <ChatPreview chat={chat} />
            </li>
          ))}
        </ul> :
        <p className="p-2 shadow">No chats found</p>
      )}
    </main>
  );
}

function ChatPreview({ chat }: { chat: Chat }) {
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
