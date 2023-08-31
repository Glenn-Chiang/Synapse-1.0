import { faChevronLeft, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chat } from "../../types";
import { Link } from "react-router-dom";

export default function ChatHeader({ chat }: { chat: Chat }) {
  return (
    <header className="flex items-center justify-between p-2 gap-4 h-16 w-2/3 fixed top-16 z-10 bg-white shadow">
      <BackButton />
      <Link to={'info'} className="text-center hover:bg-slate-200 px-2 rounded-md">
        <h1 className="line-clamp-1">{chat.name}</h1>
        <p>{chat.members.length} members</p>
      </Link>
      <MenuButton />
    </header>
  );
}

function BackButton() {
  // const navigate = useNavigate();
  return (
    <Link to={'..'}
      className="hover:bg-slate-300 rounded-full w-10 h-10 flex items-center justify-center"
    >
      <FontAwesomeIcon icon={faChevronLeft} />
    </Link>
  );
}

function MenuButton() {
  return (
    <button className="hover:bg-slate-300 rounded-full w-10 h-10 ">
      <FontAwesomeIcon icon={faEllipsisV} />
    </button>
  );
}
