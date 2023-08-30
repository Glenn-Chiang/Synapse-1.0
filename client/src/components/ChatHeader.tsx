import { faChevronLeft, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate()
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
