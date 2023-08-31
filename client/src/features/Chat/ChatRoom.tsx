import { useOutletContext } from "react-router-dom";
import { useQuery } from "react-query";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { getChatMessages, useCreateMessage } from "../../requests/messages";
import { IncomingMessage, OutgoingMessage } from "../../components/Message";
import MessageInput from "../../components/MessageInput";
import { Chat } from "../../types";

export default function ChatRoom() {
  const currentUserId = localStorage.getItem("userId") as string;

  const chat = useOutletContext() as Chat;

  const createMessageMutation = useCreateMessage();

  const handleSend = async (text: string) => {
    createMessageMutation.mutate({
      text,
      senderId: currentUserId,
      chatId: chat.id,
    });
  };

  return (
    <>
      <section className="mb-20 p-2 bg-slate-100 flex flex-col">
        <MessageThread chatId={chat.id} />
      </section>
      <MessageInput onSend={handleSend} />
    </>
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
