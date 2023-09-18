import {
  faCommentDots,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import SearchBar from "../../components/Searchbar";
import { useQuery } from "react-query";
import { getUserChannels } from "../../services/channels";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { Link, Outlet } from "react-router-dom";
import ChannelPreview from "./ChannelPreview";
import { useAppDispatch, useAppSelector } from "../../store";
import CreateChannelModal from "../CreateChannel/CreateChannelModal";
import { openModal } from "../CreateChannel/channelModalSlice";

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

  const toggleSearch = () => {
    setSearchIsVisible((prev) => !prev);
    setSearchTerms("");
  };

  const modalIsOpen = useAppSelector((state) => state.channelModal.isOpen);

  return (
    <main className="flex">
      <section className="fixed w-1/3 h-full bg-slate-300">
        <div className="p-2 flex items-center justify-between gap-2 shadow bg-white h-16">
          <Link to={"/channels"}>
            <h1 className="flex gap-2 items-center text-cyan-500 hover:text-cyan-600 transition">
              <FontAwesomeIcon icon={faCommentDots} />
              Channels
            </h1>
          </Link>
          <button
            onClick={toggleSearch}
            className="p-2 rounded-full w-10 hover:bg-slate-200"
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        {searchIsVisible && (
          <SearchBar
            position="fixed top-32"
            placeholder="Search your channels..."
            handleSearch={handleSearch}
          />
        )}
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <ErrorMessage message="Error fetching channels" />
        ) : filteredChannels.length > 0 ? (
          <ul
            className={`flex flex-col gap-2 p-2 overflow-auto no-scrollbar ${
              searchIsVisible
                ? "mt-16 h-[calc(100%-12rem)]"
                : "h-[calc(100%-8rem)]"
            }`}
          >
            {filteredChannels.map((channel) => (
              <li key={channel.id}>
                <ChannelPreview channel={channel} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="p-4 shadow bg-white">No channels found</p>
        )}
        <CreateChannelButton />
      </section>
      {modalIsOpen && <CreateChannelModal />}
      <div className="absolute w-2/3 left-1/3">
        <Outlet />
      </div>
    </main>
  );
}

export default Channels;

function CreateChannelButton() {
  const dispatch = useAppDispatch()
  const handleClick = () => {
    dispatch(openModal())
  }
  return (
    <button onClick={handleClick} className="absolute bottom-20 right-4 bg-cyan-500 text-white p-2 rounded-full w-10 h-10 shadow hover:bg-cyan-600">
      <FontAwesomeIcon icon={faPlus} />
    </button>
  );
}
