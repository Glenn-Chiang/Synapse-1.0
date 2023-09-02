import { useOutletContext, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import {
  getChannelMessages,
  useCreateMessage,
  useMessageSubscription,
} from "../../requests/messages";
import { IncomingMessage, OutgoingMessage } from "../../components/Message";
import MessageInput from "../../components/MessageInput";
import { Channel } from "../../types";

export default function ChannelRoom() {
  const currentUserId = localStorage.getItem("userId") as string;

  const channel = useOutletContext() as Channel;

  const createMessage = useCreateMessage();

  const handleSend = async (text: string) => {
    createMessage({ text, senderId: currentUserId, channelId: channel.id });
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

  useMessageSubscription();

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
