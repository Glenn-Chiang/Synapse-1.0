import { faChevronLeft, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useRef } from "react";
import { createMessage, getChatMessages } from "../../requests/messages";
import { IncomingMessage, OutgoingMessage } from "../../components/Message";
import { createChat, getChat } from "../../requests/chats";

export default function ChatRoom() {
  const currentUserId = localStorage.getItem("userId") as string;
  const otherUserId = useParams().chatId as string;
  const chatname = useLocation().state.chatname as string;

  const {
    isLoading,
    isError,
    data: chat,
  } = useQuery({
    queryKey: ["chats", otherUserId],
    queryFn: () => getChat(currentUserId, otherUserId),
  });

  const queryClient = useQueryClient();

  const createMessageMutation = useMutation({
    mutationFn: ({
      text,
      senderId,
      chatId,
    }: {
      text: string;
      senderId: string;
      chatId: string;
    }) => createMessage(text, senderId, chatId),
    onSuccess: async () => {
      await queryClient.invalidateQueries(["chats", chat?.id, "messages"]);
    },
  });

  const createChatMutation = useMutation({
    mutationFn: ({
      text,
      senderId,
      recipientId,
    }: {
      text: string;
      senderId: string;
      recipientId: string;
    }) => createChat(text, senderId, recipientId),
    onSuccess: async () => {
      await queryClient.invalidateQueries(["chats", otherUserId]);
    },
  });

  const handleSend = async (text: string) => {
    if (chat) {
      createMessageMutation.mutate({
        text,
        senderId: currentUserId,
        chatId: chat.id,
      });
    } else {
      // Create chat if it does not yet exist, together with new message
      createChatMutation.mutate({
        text,
        senderId: currentUserId,
        recipientId: otherUserId,
      });
    }
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
          <MessageThread chatId={chat.id} />
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
      inputRef.current.value = "";
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

function MessageThread({ chatId }: { chatId: string }) {
  const {isLoading, isError, data: messages} = useQuery({
    queryKey: ["chats", chatId, "messages"],
    queryFn: () => getChatMessages(chatId)
  })
  const currentUserId = localStorage.getItem("userId");

  if (isLoading) {
    return <Loading/>
  }

  if (isError) {
    return <ErrorMessage message="Error loading messages"/>
  }

  return (
    <ul className="flex flex-col gap-4 ">
      {messages?.map((message) =>
        message.sender.id === currentUserId ? (
          <OutgoingMessage key={message.id} message={message} />
        ) : (
          <IncomingMessage key={message.id} message={message} />
        )
      )}
    </ul>
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
