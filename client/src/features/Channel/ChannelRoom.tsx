import { useOutletContext, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import {
  getChannelMessages,
  useCreateMessage,

} from "../../requests/messages";
import { IncomingMessage, OutgoingMessage } from "../../components/Message";
import MessageInput from "../../components/MessageInput";
import { Channel, Message } from "../../types";
import socket from "../../socket";
import { useEffect } from "react";

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
  const currentUserId = localStorage.getItem('userId')

  const {
    isLoading,
    isError,
    data: messages,
  } = useQuery({
    queryKey: ["channels", channelId, "messages"],
    queryFn: () => getChannelMessages(channelId),
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    const onMessage = async (message: Message) => {
      console.log("message received");
      await queryClient.invalidateQueries([
        "channels",
        message.channel,
        "messages",
      ]);
      await queryClient.invalidateQueries(["user", "channels"]);
    };
    socket.on("message:create", onMessage);

    return () => {
      socket.off("message:create");
    };
  }, [queryClient]);

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
