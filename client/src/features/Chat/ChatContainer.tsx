import { Outlet, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ChatHeader from "./ChatHeader";
import { Chat } from "../../types";
import { getChat } from "../../requests/chats";

export default function ChatContainer() {
  const otherUserId = useParams().userId as string;
  const currentUserId = localStorage.getItem('userId') as string

  const {
    isLoading,
    isError,
    data: chat,
  } = useQuery({
    queryKey: ["chats", otherUserId],
    queryFn: () => getChat([otherUserId, currentUserId]),
  });

  return (
    <section>
      {chat && <ChatHeader chat={chat as Chat} />}
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorMessage message="Error loading chat" />
      ) : (
        chat && (
          <div className="mt-16 h-full">
            <Outlet context={chat} />
          </div>
        )
      )}
    </section>
  );
}
