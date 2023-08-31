import { faCommentDots, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import SearchBar from "../../components/Searchbar";
import { useQuery } from "react-query";
import { getChats } from "../../requests/chats";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ChatPreview from "./ChatPreview";
import { Outlet } from "react-router-dom";

function Chats() {
  const userId = localStorage.getItem("userId") as string;

  const {
    isLoading,
    isError,
    data: chats,
  } = useQuery({
    queryKey: ["chats"],
    queryFn: () => getChats(userId),
  });

  const [filterShown, setFilterShown] = useState(false);

  return (
    <main className="flex">
      <section className="fixed w-1/3 h-full bg-slate-200">
        <div className="p-2 flex items-center justify-between gap-2 shadow bg-white h-16">
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
          <ErrorMessage message="Error fetching chats" />
        ) : chats && chats.length > 0 ? (
          <ul className="flex flex-col gap-2 p-2 h-[calc(100%-8rem)] overflow-auto">
            {chats?.map((chat) => (
              <li key={chat.id}>
                <ChatPreview chat={chat} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="p-4 shadow">No chats found</p>
        )}
      </section>
      <div className="absolute w-2/3 left-1/3">
        <Outlet/>
      </div>
    </main>
  );
}

export default Chats;
