import {
  faChevronLeft,
  faEllipsisV,
  faHandDots,
  faListDots,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";

export default function ChatRoom() {
  // const chatId = useParams().chatId

  const chat = {
    id: "3",
    users: [
      {
        id: "1",
        username: "Glenn",
      },
      {
        id: "2",
        username: "024GHOSTtttttttttttttttttttttttttttttttttttt",
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
  };

  const { users, messages } = chat;
  const otherUser = users[1];
  const me = users[0];

  return (
    <main className="">
      <header className="flex items-center justify-between p-2 gap-4 shadow">
        <BackButton />
        <h1 className=" line-clamp-1">{otherUser.username}</h1>
        <MenuButton />
      </header>
      <section className="bg-slate-100 h-screen">
hi
      </section>
    </main>
  );
}

function BackButton() {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)} className="hover:bg-slate-300 rounded-full w-10 h-10 ">
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
