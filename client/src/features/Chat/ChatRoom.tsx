import { useParams } from "react-router-dom";

import MessageInput from "../../components/MessageInput";
import MessageThread from "../../components/MessageThread";
import { useQuery } from "react-query";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { getChat } from "../../requests/chats";
import { createMessage, getChatMessages } from "../../requests/messages";
import { Chat } from "../../types";

export default function ChatRoom() {
  const otherUserId = useParams().userId as string;
  const currentUserId = localStorage.getItem("userId") as string;

  const chatQuery = useQuery({
    queryKey: ["chats", currentUserId, otherUserId],
    queryFn: () => getChat([currentUserId, otherUserId]),
  });

  const chat = chatQuery.data;

  const messagesQuery = useQuery({
    queryKey: ["chats", (chat as Chat).id, "messages"],
    queryFn: () => getChatMessages((chat as Chat).id),
    enabled: !!chat, // Only run when chat exists
  });

  const handleSend = (text: string) => {
    createMessage({ text, senderId: currentUserId, recipientId: otherUserId });
  };

  if (messagesQuery.isLoading) {
    return <Loading />;
  }
  if (messagesQuery.isError) {
    return <ErrorMessage message="Error loading messages" />;
  }

  return (
    <>
      <section className="mb-20 p-2 bg-slate-100 flex flex-col">
        {chat && <MessageThread messages={chat.messages} />}
      </section>
      <MessageInput onSend={handleSend} />
    </>
  );
}
