import {
  faChevronLeft,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import { Message } from "../../types";

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
        username: "Kang Jie",
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
  // const me = users[0];

  return (
    <section className="">
      <header className="flex items-center justify-between p-2 gap-4 h-16 w-screen fixed z-10 bg-white">
        <BackButton />
        <h1 className=" line-clamp-1">{otherUser.username}</h1>
        <MenuButton />
      </header>
      <MessageThread messages={messages} />
      <InputField/>
    </section>
  );
}

function InputField() {
  return (
    <div className="fixed bottom-0 w-screen bg-white p-4 flex justify-center">
      <input placeholder="Type something..." className="w-11/12 rounded-full p-3 bg-slate-100"/>

    </div>
  )
}

function MessageThread({ messages }: { messages: Message[] }) {
  return (
    <section className="relative left-0 top-16 h-screen p-4 bg-slate-100">
      <ul className="">
        {messages.map((message) => (
          <li key={message.id}>
            <MessageBubble message={message}/>
          </li>
        ))}
      </ul>
    </section>
  );
}

function MessageBubble({ message }: { message: Message }) {
  return (

  <article>
    {message.text}
  </article>
  )
}

function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="hover:bg-slate-300 rounded-full w-10 h-10 "
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
