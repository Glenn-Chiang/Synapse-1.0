import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import {
  getChannelMessages,
  useMessageSubscription,
} from "../../requests/messages";
import { IncomingMessage, OutgoingMessage } from "../../components/Message";
import MessageInput from "../../components/MessageInput";
import socket from "../../socket";

export default function ChannelRoom() {
  const currentUserId = localStorage.getItem("userId") as string;
  const channelId = useParams().channelId as string


  const handleSend = async (text: string) => {
    socket.emit("message:create", {senderId: currentUserId, channelId, text});
  };

  return (
    <>
      <section className="mb-20 p-2 bg-slate-100 flex flex-col">
        <MessageThread />
      </section>
      <MessageInput onSend={handleSend} />
    </>
  );
}

function MessageThread() {
  const channelId = useParams().channelId as string;
  const currentUserId = localStorage.getItem("userId");

  const {
    isLoading,
    isError,
    data: messages,
  } = useQuery({
    queryKey: ["channels", channelId, "messages"],
    queryFn: () => getChannelMessages(channelId),
  });

  useMessageSubscription(); // Listen to messages from the server
  
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
