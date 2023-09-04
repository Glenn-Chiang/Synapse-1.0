import { useParams } from "react-router-dom";

import MessageInput from "../../components/MessageInput";
import MessageThread from "../../components/MessageThread";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { createMessage, useGetChatMessages } from "../../requests/messages";
import { createChat, useGetChat } from "../../requests/chats";

export default function ChatRoom() {
  const otherUserId = useParams().userId as string;
  const currentUserId = localStorage.getItem("userId") as string;

  const chat = useGetChat([currentUserId, otherUserId]).data;

  const { isLoading, isError, data: messages } = useGetChatMessages(chat);

  const handleSend = (text: string) => {
    if (chat) {
      createMessage({
        text,
        senderId: currentUserId,
        roomId: chat.id,
        roomType: "Chat",
      });
    } else {
      createChat({ text, senderId: currentUserId, recipientId: otherUserId });
    }
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
