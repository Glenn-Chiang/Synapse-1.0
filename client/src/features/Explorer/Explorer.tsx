import { faEarth } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "react-query";
import { getAllChannels, joinChannel } from "../../requests/channels";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { Channel } from "../../types";
import { useNavigate } from "react-router-dom";

export default function Explorer() {
  const {
    isLoading,
    isError,
    data: channels,
  } = useQuery({
    queryKey: ["channels"],
    queryFn: getAllChannels,
  });

  return (
    <main className="p-2">
      <h1 className="text-cyan-500 flex items-center gap-2 py-4 justify-center">
        <FontAwesomeIcon icon={faEarth} />
        Explore Channels
      </h1>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorMessage message="Error getting channels" />
      ) : (
        channels && <ChannelsGrid channels={channels} />
      )}
    </main>
  );
}

function ChannelsGrid({ channels }: { channels: Channel[] }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center p-4">
      {channels.map((channel) => (
        <ChannelCard key={channel.id} channel={channel} />
      ))}
    </section>
  );
}

function ChannelCard({ channel }: { channel: Channel }) {
  const currentUserId = localStorage.getItem("userId") as string;

  const alreadyJoined = !!channel.members.find(
    (user) => user.id === currentUserId
  );

  const navigate = useNavigate();

  const handleClick = () => {
    joinChannel(currentUserId, channel.id);
    navigate(`/channels/${channel.id}`);
  };

  return (
    <article className="w-48 h-48 shadow bg-white p-4 rounded-xl flex flex-col justify-between">
      <h1 className="p-1 text-center text-xl">{channel.name}</h1>
      <p className="p-1 text-center">{channel.description}</p>
      <JoinButton onClick={handleClick} disabled={alreadyJoined} />
    </article>
  );
}

function JoinButton({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-white rounded-md p-2 ${
        disabled ? "bg-cyan-600/40" : "bg-cyan-500 "
      }`}
      disabled={disabled}
    >
      {disabled ? "Joined" : "Join"}
    </button>
  );
}
