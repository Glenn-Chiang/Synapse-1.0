import { useOutletContext } from "react-router-dom";
import { useQuery } from "react-query";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { getChannelMessages, useCreateMessage } from "../../requests/messages";
import { IncomingMessage, OutgoingMessage } from "../../components/Message";
import MessageInput from "../../components/MessageInput";
import { Channel } from "../../types";

export default function ChannelRoom() {
  const currentUserId = localStorage.getItem("userId") as string;

  const channel = useOutletContext() as Channel;

  const createMessageMutation = useCreateMessage();

  const handleSend = async (text: string) => {
    createMessageMutation.mutate({
      text,
      senderId: currentUserId,
      channelId: channel.id,
    });
  };

  return (
    <>
      <section className="mb-20 p-2 bg-slate-100 flex flex-col">
        <MessageThread channelId={channel.id} />
      </section>
      <MessageInput onSend={handleSend} />
    </>
  );
}

function MessageThread({ channelId }: { channelId: string }) {
  const {
    isLoading,
    isError,
    data: messages,
  } = useQuery({
    queryKey: ["channels", channelId, "messages"],
    queryFn: () => getChannelMessages(channelId),
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
