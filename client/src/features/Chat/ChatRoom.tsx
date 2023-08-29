import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useRef } from "react";
import { getChatMessages } from "../../requests/messages";
import { IncomingMessage, OutgoingMessage } from "../../components/Message";
import { getChat } from "../../requests/chats";
import { useCreateChat, useCreateMessage } from "./queries";
import ChatHeader from "../../components/ChatHeader";

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

  const createMessageMutation = useCreateMessage();
  const createChatMutation = useCreateChat();

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
  const {
    isLoading,
    isError,
    data: messages,
  } = useQuery({
    queryKey: ["chats", chatId, "messages"],
    queryFn: () => getChatMessages(chatId),
  });
  const currentUserId = localStorage.getItem("userId");

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorMessage message="Error loading messages" />;
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
