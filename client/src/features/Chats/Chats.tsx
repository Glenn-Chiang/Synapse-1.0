import { faCommentDots, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import SearchBar from "../../components/Searchbar";
import { useQuery } from "react-query";
import { getChats } from "../../requests/chats";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ChatPreview from "../../components/ChatPreview";

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
        <p className="p-4 shadow">No chats found</p>
      )}
    </main>
  );
}


export default Chats;
