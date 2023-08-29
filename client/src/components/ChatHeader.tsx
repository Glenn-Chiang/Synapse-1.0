import { faChevronLeft, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function ChatHeader({ chatname }: { chatname: string }) {
  return (
    <header className="flex items-center justify-between p-2 gap-4 h-16 w-screen fixed top-16 z-10 bg-white shadow">
      <BackButton />
      <h1 className=" line-clamp-1">{chatname}</h1>
      <MenuButton />
    </header>
  );
}


function BackButton() {
  return (
    <Link
      to={"/chats"}
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
