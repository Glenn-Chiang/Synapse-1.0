import {
  faChevronLeft,
  faEllipsisV,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { Channel } from "../../types";

export default function ChannelHeader({ channel, toggleSearch }: { channel: Channel, toggleSearch: () => void }) {
  return (
    <header className="flex items-center justify-between p-2 gap-4 h-16 w-2/3 fixed top-16 bg-white shadow z-20">
      <BackButton />
      <Link
        to={"info"}
        className="text-center hover:bg-slate-200 px-2 rounded-md"
      >
        <h1 className="line-clamp-1">{channel.name}</h1>
        <p>{channel.members.length} members</p>
      </Link>
      <div>
        <SearchButton onClick={toggleSearch}/>
        <MenuButton />
      </div>
    </header>
  );
}

function SearchButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="hover:bg-slate-300 rounded-full w-10 h-10 "
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faSearch} />
    </button>
  );
}

function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="hover:bg-slate-300 rounded-full w-10 h-10 flex items-center justify-center"
    >
      <FontAwesomeIcon icon={faChevronLeft} />
    </button>
  );
}

function MenuButton() {
  return (
    <button className="hover:bg-slate-300 rounded-full w-10 h-10 ">
      <FontAwesomeIcon icon={faEllipsisV} />
    </button>
  );
}
