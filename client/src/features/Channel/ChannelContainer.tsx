import { Outlet, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getChannel } from "../../requests/channels";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ChannelHeader from "./ChannelHeader";

export default function ChannelContainer() {
  const channelId = useParams().channelId as string;

  const {
    isLoading,
    isError,
    data: channel,
  } = useQuery({
    queryKey: ["channels", channelId],
    queryFn: () => getChannel(channelId),
  });

  return (
    <section>
      {channel && <ChannelHeader channel={channel} />}
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorMessage message="Error loading channel" />
      ) : (
        channel && (
          <div className="mt-16 h-full">
            <Outlet context={channel} />
          </div>
        )
      )}
    </section>
  );
}
