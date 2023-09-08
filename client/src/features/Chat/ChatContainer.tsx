import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import ChatHeader from "./ChatHeader";
import { getUser } from "../../requests/users";
import { useCreateMessage, useGetChatMessages } from "../../requests/messages";
import { useCreateChat, useGetChat } from "../../requests/chats";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import MessageInput from "../../components/MessageInput";
import MessageThread from "../../components/MessageThread";

export default function ChatContainer() {
  const otherUserId = useParams().userId as string;

  const userQuery = useQuery({
    queryKey: ["users", otherUserId],
    queryFn: () => getUser(otherUserId),
  });

  const otherUser = userQuery.data;

  const currentUserId = localStorage.getItem("userId") as string;

  const chat = useGetChat([currentUserId, otherUserId]).data;

  const { isLoading, isError, data: messages } = useGetChatMessages(chat);

  const createMessage = useCreateMessage();
  const createChat = useCreateChat();

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
    <section>
      {otherUser && <ChatHeader chatname={otherUser.username} />}
      <div className="mt-16 h-full">
        <section className="mb-20 p-2 bg-slate-100 flex flex-col">
          {messages && <MessageThread messages={messages} />}
        </section>
        <MessageInput onSend={handleSend} />
      </div>
    </section>
  );
}
