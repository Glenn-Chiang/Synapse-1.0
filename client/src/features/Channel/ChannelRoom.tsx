import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useCreateMessage, useGetChannelMessages } from "../../requests/messages";
import MessageInput from "../../components/MessageInput";
import { Message } from "../../types";
import MessageThread from "../../components/MessageThread";

export default function ChannelRoom() {
  const channelId = useParams().channelId as string;
  const currentUserId = localStorage.getItem("userId") as string;

  const {
    isLoading,
    isError,
    data: messages,
  } = useGetChannelMessages(channelId);

  const createMessage = useCreateMessage()

  const handleSend = async (text: string) => {
    createMessage({
      text,
      senderId: currentUserId,
      roomId: channelId,
      roomType: "Channel",
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
        <MessageThread messages={messages as Message[]} />
      </section>
      <MessageInput onSend={handleSend} />
    </>
  );
}
