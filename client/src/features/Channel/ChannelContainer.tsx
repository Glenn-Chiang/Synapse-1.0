import { useParams } from "react-router-dom";
import {
  useConnectionSubscription,
  useGetChannel,
} from "../../services/channels";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ChannelHeader from "./ChannelHeader";
import {
  useCreateMessage,
  useGetChannelMessages,
} from "../../services/messages";
import MessageThread from "../../components/MessageThread";
import MessageInput from "../../components/MessageInput";
import { useState, useEffect } from "react";
import SearchBar from "../../components/Searchbar";
import socket from "../../socket";

export default function ChannelContainer() {
  const channelId = useParams().channelId as string;
  const currentUserId = localStorage.getItem("userId") as string;
  const currentUsername = localStorage.getItem("username") as string;

  const channelQuery = useGetChannel(channelId);
  const channel = channelQuery.data;

  const messagesQuery = useGetChannelMessages(channelId);
  const messages = messagesQuery.data;
  // console.log('Total messages:', messages?.length)
  // console.log('Unread messages:', messages?.filter(message => !message.isRead).length)

  // Sending messages
  const createMessage = useCreateMessage();
  const handleSend = (text: string) => {
    createMessage({
      text,
      senderId: currentUserId,
      roomId: channelId,
      roomType: "Channel",
    });
  };

  // Emit typing event
  const handleTyping = () => {
    socket.emit("user typing", currentUsername, channelId);
  };

  // 'User is typing' listener
  const [typingUser, setTypingUser] = useState<string>("");
  useEffect(() => {
    let typingTimer: NodeJS.Timeout | undefined = undefined;
    const handleUserTyping = (username: string) => {
      setTypingUser(username);
      clearTimeout(typingTimer);
      typingTimer = setTimeout(() => {
        setTypingUser("");
      }, 1000);
    };
    socket.on("user typing", handleUserTyping);
    return () => {
      socket.off("user typing", handleUserTyping);
    };
  }, []);

  useConnectionSubscription(channelId);

  useEffect(() => {
    setSearchIsVisible(false); // Reset search display when route changes
  }, [channelId]);

  const [searchIsVisible, setSearchIsVisible] = useState(false);
  const [searchTerms, setSearchTerms] = useState("");

  const handleSearch = (inputValue: string) => {
    setSearchTerms(inputValue);
  };

  const toggleSearch = () => {
    setSearchIsVisible((prev) => !prev);
    setSearchTerms("");
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
          toggleSearch={toggleSearch}
          typingUser={typingUser}
        />
      )}
      {searchIsVisible && (
        <SearchBar
          position="fixed top-32"
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
          <div className={`h-full ${searchIsVisible ? "mt-32" : "mt-16"}`}>
            {filteredMessages.length > 0 && (
              <section className="mb-20 p-2 bg-slate-100 flex flex-col">
                <MessageThread messages={filteredMessages} />
              </section>
            )}
            <MessageInput onSend={handleSend} onType={handleTyping} />
          </div>
        )
      )}
    </section>
  );
}
