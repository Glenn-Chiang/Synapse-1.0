import { useParams } from "react-router-dom";

import MessageInput from "../../components/MessageInput";
import MessageThread from "../../components/MessageThread";
import { useQuery } from "react-query";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { createMessage, getChatMessages } from "../../requests/messages";

export default function ChatRoom() {
  const otherUserId = useParams().userId as string;
  const currentUserId = localStorage.getItem("userId") as string;

  const {
    isLoading,
    isError,
    data: messages,
  } = useQuery({
    queryKey: ["users", otherUserId, "messages"],
    queryFn: () => getChatMessages([currentUserId, otherUserId]),
  });

  const handleSend = (text: string) => {
    createMessage({
      text,
      senderId: currentUserId,
      recipientId: otherUserId,
      recipientType: "User",
    });
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
        {messages && <MessageThread messages={messages} />}
      </section>
      <MessageInput onSend={handleSend} />
    </>
  );
}
