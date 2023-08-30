import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { getChatMessages, useCreateMessage } from "../../requests/messages";
import { IncomingMessage, OutgoingMessage } from "../../components/Message";
import { getChat } from "../../requests/chats";
import ChatHeader from "../../components/ChatHeader";
import MessageInput from "../../components/MessageInput";


export default function ChatRoom() {
  const currentUserId = localStorage.getItem("userId") as string;
  const chatname = useLocation().state.chatname as string;
  const chatId = useParams().chatId as string

  const {
    isLoading,
    isError,
    data: chat,
  } = useQuery({
    queryKey: ["chats", chatId],
    queryFn: () => getChat(chatId)
  });

  const createMessageMutation = useCreateMessage();

  const handleSend = async (text: string) => {
      createMessageMutation.mutate({
        text,
        senderId: currentUserId,
        chatId,
      });
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
      <MessageInput onSend={handleSend} />
    </section>
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
