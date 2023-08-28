import { faChevronLeft, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import { Message } from "../../types";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getChat } from "../../requests/chats";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useRef } from "react";
import { createMessage } from "../../requests/messages";

export default function ChatRoom() {
  const currentUserId = localStorage.getItem("userId") as string;
  const chatId = useParams().chatId as string;
  const chatname = useParams().username as string;
  const {
    isLoading,
    isError,
    data: chat,
  } = useQuery({
    queryKey: ["chats", chatId],
    queryFn: () => getChat(chatId),
  });

  const queryClient = useQueryClient();

  interface MessageArgs {
    text: string;
    senderId: string;
    chatId: string;
  }

  const createMessageMutation = useMutation({
    mutationFn: ({ text, senderId, chatId }: MessageArgs) =>
      createMessage(text, senderId, chatId),
    onSuccess: () => queryClient.invalidateQueries(["chats", chatId]),
  });

  const handleSend = (text: string) => {
    createMessageMutation.mutate({ text, senderId: currentUserId, chatId });
  };

  return (
    <section className="w-full">
      <ChatHeader chatname={chatname} />
      <section className="mt-16 mb-20 p-2 bg-slate-100 flex flex-col">
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <ErrorMessage message="Error loading chat" />
        ) : chat ? (
          <MessageThread messages={chat.messages} />
        ) : (
          <p className="text-center bg-cyan-500 text-white w-1/3 m-auto rounded-xl p-4 shadow">
            Send a message and start chatting!
          </p>
        )}
      </section>
      <InputField onSend={handleSend} />
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

function InputField({ onSend }: { onSend: (content: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    const inputField = inputRef.current;
    if (event.key === "Enter") {
      if (!inputField) {
        return;
      }
      onSend(inputField.value);
    }
  };
  return (
    <div className="fixed bottom-0 w-screen bg-white p-4 flex justify-center drop-shadow-2xl">
      <input
        ref={inputRef}
        autoFocus
        placeholder="Type something..."
        className="w-11/12 rounded-full p-3 bg-slate-100"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

function MessageThread({ messages }: { messages: Message[] }) {
  const currentUserId = localStorage.getItem("userId");
  return (
    <ul className="flex flex-col gap-4 ">
      {messages.map((message) =>
        message.sender.id === currentUserId ? (
          <OutgoingMessage key={message.id} message={message} />
        ) : (
          <IncomingMessage key={message.id} message={message} />
        )
      )}
    </ul>
  );
}

function OutgoingMessage({ message }: { message: Message }) {
  return (
    <li className="self-end flex flex-col items-end ">
      <p className="bg-cyan-500 text-white p-4 rounded-xl shadow max-w-xs break-words">
        {message.text}
      </p>
      <span className="p-2 text-sm text-slate-400">
        {message.timestamp.toLocaleString()}
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
        {message.timestamp.toLocaleString()}
      </span>
    </li>
  );
}

function BackButton() {
  return (
    <Link to={"/chats"} className="hover:bg-slate-300 rounded-full w-10 h-10 flex items-center justify-center">
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
