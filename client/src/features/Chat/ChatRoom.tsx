import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { getChatMessages } from "../../requests/messages";
import MessageInput from "../../components/MessageInput";
import socket from "../../socket";
import { Message } from "../../types";
import MessageThread from "../../components/MessageThread";

export default function ChatRoom() {
  const chatId = useParams().chatId as string;
  const currentUserId = localStorage.getItem("userId");

  const {
    isLoading,
    isError,
    data: messages,
  } = useQuery({
    queryKey: ["chats", chatId, "messages"],
    queryFn: () => getChatMessages(chatId),
  });

  const handleSend = async (text: string) => {
    socket.emit("message:create", { senderId: currentUserId, chatId, text });
  };

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <ErrorMessage message="Error loading messages" />;
  }

  return (
    <>
      <section className="mb-20 p-2 bg-slate-100 flex flex-col">
        <MessageThread messages={messages as Message[]} />
      </section>
      <MessageInput onSend={handleSend} />
    </>
  );
}
