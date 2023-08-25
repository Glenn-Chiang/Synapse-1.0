import {
  faChevronLeft,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
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
        text: "This is a very looooooooooooooooooooooooooooooooooooooooonnnggggggggggggggggggg  messssssssssaaaaaaaaaaaaaaaaaggggggggggggggggggggggggggggggggggeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
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
        text: "Hello world. Check out my brand new real-time chat app app app app app app app app app app app appa",
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
    <section className="w-full">
      <ChatHeader chatname={otherUser.username}/>
      <MessageThread messages={messages} />
      <InputField />
    </section>
  );
}

function ChatHeader({ chatname }: { chatname: string }) {
  return (
    <header className="flex items-center justify-between p-2 gap-4 h-16 w-screen fixed top-16 z-10 bg-white shadow">
      <BackButton />
      <h1 className=" line-clamp-1">{chatname}</h1>
      <MenuButton />
    </header>
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
    <section className="mt-16 mb-20 p-2 bg-slate-100 flex flex-col">
      <ul className="flex flex-col gap-4 ">
        {messages.map((message) =>
          message.sender.id === currentUserId ? (
            <OutgoingMessage key={message.id} message={message} />
          ) : (
            <IncomingMessage key={message.id} message={message} />
          )
        )}
      </ul>
    </section>
  );
}

function OutgoingMessage({ message }: { message: Message }) {
  return (
    <li className="self-end flex flex-col items-end ">
      <p className="bg-cyan-500 text-white p-4 rounded-xl shadow max-w-xs break-words">
        {message.text}
      </p>
      <span className="p-2 text-sm text-slate-400">
        {message.timeStamp.toLocaleString()}
      </span>
    </li>
  );
}

function IncomingMessage({ message }: { message: Message }) {
  return (
    <li className="self-start flex flex-col ">
      <p className="bg-white p-4 rounded-xl shadow max-w-xs break-words">
        {message.text}
      </p>
      <span className="p-2 text-sm text-slate-400">
        {message.timeStamp.toLocaleString()}
      </span>
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
