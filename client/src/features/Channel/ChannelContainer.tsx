import { useParams } from "react-router-dom";
import { useGetChannel } from "../../requests/channels";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ChannelHeader from "./ChannelHeader";
import { useCreateMessage, useGetChannelMessages } from "../../requests/messages";
import MessageThread from "../../components/MessageThread";
import MessageInput from "../../components/MessageInput";
import { Message } from "../../types";
import {useState} from 'react'
import SearchBar from "../../components/Searchbar";

export default function ChannelContainer() {
  const channelId = useParams().channelId as string;
  const currentUserId = localStorage.getItem("userId") as string;

  const channelQuery = useGetChannel(channelId)
  const channel = channelQuery.data

  const messagesQuery = useGetChannelMessages(channelId)

  const createMessage = useCreateMessage();

  const handleSend = async (text: string) => {
    createMessage({
      text,
      senderId: currentUserId,
      roomId: channelId,
      roomType: "Channel",
    });
  };

  const [searchIsVisible, setSearchIsVisible] = useState(false)


  return (
    <section>
      {channel && <ChannelHeader channel={channel} toggleSearch={() => setSearchIsVisible(prev => !prev)}/>}
      {searchIsVisible && <SearchBar placeholder="Search messages..."/>}
      {(channelQuery.isLoading || messagesQuery.isLoading) ? (
        <Loading />
      ) : (channelQuery.isError || messagesQuery.isError) ? (
        <ErrorMessage message="Error loading channel" />
      ) : (
        channel && (
          <div className="mt-16 h-full">
            <section className="mb-20 p-2 bg-slate-100 flex flex-col">
              <MessageThread messages={messagesQuery.data as Message[]} />
            </section>
            <MessageInput onSend={handleSend} />
          </div>
        )
      )}
    </section>
  );
}

