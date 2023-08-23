import { faChevronLeft, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
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
        text: "messageee 1",
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
      {
        id: "2",
        text: "message 1",
        sender: {
          id: "2",
          username: "024GHOST",
        },
        recipient: {
          id: "1",
          username: "Glenn",
        },
        timeStamp: new Date(),
      },
      {
        id: "3",
        text: "messssssssssage 1",
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
      {
        id: "4",
        text: "messssssssssage 1",
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
      {
        id: "5",
        text: "messssssssssage 1",
        sender: {
          id: "2",
          username: "024GHOST",
        },
        recipient: {
          id: "1",
          username: "Glenn",
        },
        timeStamp: new Date(),
      },
      {
        id: "6",
        text: "messssssssssage 1",
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
      {
        id: "7",
        text: "messssssssssage 1",
        sender: {
          id: "2",
          username: "024GHOST",
        },
        recipient: {
          id: "1",
          username: "Glenn",
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
      <header className="flex items-center justify-between p-2 gap-4 h-16 w-screen fixed z-10 bg-white shadow">
        <BackButton />
        <h1 className=" line-clamp-1">{otherUser.username}</h1>
        <MenuButton />
      </header>
      <MessageThread messages={messages} />
      <InputField />
    </section>
  );
}

function InputField() {
  return (
    <div className="fixed bottom-0 w-screen bg-white p-4 flex justify-center drop-shadow-2xl">
      <input
        placeholder="Type something..."
        className="w-11/12 rounded-full p-3 bg-slate-100"
      />
    </div>
  );
}

function MessageThread({ messages }: { messages: Message[] }) {
  const currentUserId = "1"; // todo

  return (
    <section className="relative left-0 bottom-20 min-h-screen p-4 bg-slate-100 flex flex-col justify-end">
      <ul className="flex flex-col gap-4 ">
        {messages.map((message) => (
          <>
            {message.sender.id === currentUserId ? (
              <OutgoingMessage message={message} />
            ) : (
              <IncomingMessage message={message} />
            )}
          </>
        ))}
      </ul>
    </section>
  );
}

function OutgoingMessage({ message }: { message: Message }) {
  return (
    <li key={message.id} className="self-end bg-cyan-500 text-white p-2 rounded-xl w-max shadow">
      {message.text}
    </li>
  );
}

function IncomingMessage({ message }: { message: Message }) {
  return (
    <li key={message.id} className=" bg-white flex p-2 rounded-xl w-max shadow">
      {message.text}
    </li>
  );
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
