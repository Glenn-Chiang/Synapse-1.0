import { Outlet, useParams } from "react-router-dom";
import ChatHeader from "./ChatHeader";
import { useQuery } from "react-query";
import { getChat } from "../../requests/chats";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

export default function ChatContainer() {
    const chatId = useParams().chatId as string;

    const {
      isLoading,
      isError,
      data: chat,
    } = useQuery({
      queryKey: ["chats", chatId],
      queryFn: () => getChat(chatId),
    });


  return (
    <section>
      {chat && <ChatHeader chat={chat} />}
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorMessage message="Error loading chat" />
      ) : chat && (
      <div className="mt-16 h-full">
        <Outlet context={chat}/>
      </div>
      ) }
    </section>
  );
}
