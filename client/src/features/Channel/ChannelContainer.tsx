import { useParams } from "react-router-dom";
import { useGetChannel } from "../../requests/channels";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ChannelHeader from "./ChannelHeader";
import {
  useCreateMessage,
  useGetChannelMessages,
} from "../../requests/messages";
import MessageThread from "../../components/MessageThread";
import MessageInput from "../../components/MessageInput";
import { useState } from "react";
import SearchBar from "../../components/Searchbar";

export default function ChannelContainer() {
  const channelId = useParams().channelId as string;
  const currentUserId = localStorage.getItem("userId") as string;

  const channelQuery = useGetChannel(channelId);
  const channel = channelQuery.data;

  const messagesQuery = useGetChannelMessages(channelId);
  const messages = messagesQuery.data;

  const createMessage = useCreateMessage();

  const handleSend = async (text: string) => {
    createMessage({
      text,
      senderId: currentUserId,
      roomId: channelId,
      roomType: "Channel",
    });
  };

  const [searchIsVisible, setSearchIsVisible] = useState(false);
  const [searchTerms, setSearchTerms] = useState("");

  const handleSearch = (inputValue: string) => {
    setSearchTerms(inputValue);
  };

  const filteredMessages = messages
    ? messages.filter((message) =>
        message.text.toLowerCase().includes(searchTerms.toLowerCase())
      )
    : [];

  return (
    <section className="">
      {channel && (
        <ChannelHeader
          channel={channel}
          toggleSearch={() => setSearchIsVisible((prev) => !prev)}
        />
      )}
      {searchIsVisible && (
        <SearchBar
          placeholder="Search messages..."
          handleSearch={handleSearch}
        />
      )}
      {channelQuery.isLoading || messagesQuery.isLoading ? (
        <Loading />
      ) : channelQuery.isError || messagesQuery.isError ? (
        <ErrorMessage message="Error loading channel" />
      ) : (
        channel && (
          <div className={`h-full ${searchIsVisible ? 'mt-16' : 'mt-16'}`}>
            {filteredMessages.length > 0 && (
              <section className="mb-20 p-2 bg-slate-100 flex flex-col">
                <MessageThread messages={filteredMessages} />
              </section>
            )}
            <MessageInput onSend={handleSend} />
          </div>
        )
      )}
    </section>
  );
}
