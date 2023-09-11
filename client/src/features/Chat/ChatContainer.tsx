import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import ChatHeader from "./ChatHeader";
import { getUser } from "../../services/users";
import { useCreateMessage, useGetChatMessages } from "../../services/messages";
import { useCreateChat, useGetChat } from "../../services/chats";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import MessageInput from "../../components/MessageInput";
import MessageThread from "../../components/MessageThread";
import socket from "../../socket";
import { useState, useEffect } from "react";

export default function ChatContainer() {
  const otherUserId = useParams().userId as string;
  const currentUserId = localStorage.getItem("userId") as string;
  const currentUsername = localStorage.getItem("username") as string;

  const userQuery = useQuery({
    queryKey: ["users", otherUserId],
    queryFn: () => getUser(otherUserId),
  });

  const otherUser = userQuery.data;

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

  // Emit typing event
  const handleTyping = () => {
    socket.emit("user typing", currentUsername, chat?.id);
  };

  // 'User is typing' listener
  const [isTyping, setIsTyping] = useState(false);
  useEffect(() => {
    let typingTimer: NodeJS.Timeout | undefined = undefined;
    const handleUserTyping = (username: string) => {
      console.log(username, 'is typing')
      setIsTyping(true);
      clearTimeout(typingTimer);
      typingTimer = setTimeout(() => {
        setIsTyping(false);
      }, 1000);
    };
    socket.on("user typing", handleUserTyping);
    return () => {
      socket.off("user typing", handleUserTyping);
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <ErrorMessage message="Error loading messages" />;
  }

  return (
    <section>
      {otherUser && <ChatHeader chatname={otherUser.username} isTyping={isTyping} />}
      <div className="mt-16 h-full">
        <section className="mb-20 p-2 bg-slate-100 flex flex-col">
          {messages && <MessageThread messages={messages} />}
        </section>
        <MessageInput onSend={handleSend} onType={handleTyping} />
      </div>
    </section>
  );
}
