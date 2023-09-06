import { faCommentDots, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import SearchBar from "../../components/Searchbar";
import { useQuery } from "react-query";
import { getUserChannels } from "../../requests/channels";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { Outlet } from "react-router-dom";
import ChannelPreview from "./ChannelPreview"

function Channels() {
  const userId = localStorage.getItem("userId") as string;

  const {
    isLoading,
    isError,
    data: channels,
  } = useQuery({
    queryKey: ["channels"],
    queryFn: () => getUserChannels(userId),
  });

  const [searchIsVisible, setSearchIsVisible] = useState(false);
  const [searchTerms, setSearchTerms] = useState("");

  const filteredChannels = channels
    ? channels.filter((channel) =>
        channel.name.toLowerCase().includes(searchTerms.toLowerCase())
      )
    : [];

    const handleSearch = (inputValue: string) => {
    setSearchTerms(inputValue);
  };


  return (
    <main className="flex">
      <section className="fixed w-1/3 h-full bg-slate-200">
        <div className="p-2 flex items-center justify-between gap-2 shadow bg-white h-16">
          <h1 className="flex gap-2 items-center text-cyan-500">
            <FontAwesomeIcon icon={faCommentDots} />
            Channels
          </h1>
          <button
            onClick={() => setSearchIsVisible((prev) => !prev)}
            className="p-2 rounded-full w-10 hover:bg-slate-200"
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        {searchIsVisible && <SearchBar placeholder="Search your channels..." handleSearch={handleSearch} />}
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <ErrorMessage message="Error fetching channels" />
        ) : filteredChannels.length > 0 ? (
          <ul className="flex flex-col gap-2 p-2 h-[calc(100%-8rem)] overflow-auto">
            {filteredChannels.map((channel) => (
              <li key={channel.id}>
                <ChannelPreview channel={channel} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="p-4 shadow bg-white">No channels found</p>
        )}
      </section>
      <div className="absolute w-2/3 left-1/3">
        <Outlet />
      </div>
    </main>
  );
}

export default Channels;
