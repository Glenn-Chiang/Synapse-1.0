import { useQuery } from "react-query";
import ChatHeader from "../../components/ChatHeader";
import { useLocation, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import MessageInput from "../../components/MessageInput";
import { getGroup } from "../../requests/groups";
import { getChatMessages, useCreateMessage } from "../../requests/messages";
import { IncomingMessage, OutgoingMessage } from "../../components/Message";

export default function GroupRoom() {
  const groupId = useParams().groupId as string;
  const groupname = useLocation().state.groupname;
  const currentUserId = localStorage.getItem("userId") as string;

  const {
    isLoading,
    isError,
    data: group,
  } = useQuery({
    queryKey: ["groups", groupId],
    queryFn: () => getGroup(groupId),
  });

  const createMessageMutation = useCreateMessage()

  const handleSend = async (text: string) => {
    createMessageMutation.mutate({
      text,
      senderId: currentUserId,
      chatId: group ? group.id : '',
    });
  };

  return (
    <section className="w-full">
      <ChatHeader chatname={groupname} />
      <section className="mt-16 mb-20 p-2 bg-slate-100 flex flex-col">
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <ErrorMessage message="Error loading group" />
        ) : group ? (
          <MessageThread groupId={groupId} />
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

function MessageThread({ groupId }: { groupId: string }) {
  const {
    isLoading,
    isError,
    data: messages,
  } = useQuery({
    queryKey: ["chats", groupId, "messages"],
    queryFn: () => getChatMessages(groupId),
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
