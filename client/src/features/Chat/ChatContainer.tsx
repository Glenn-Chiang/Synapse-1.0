import { Outlet, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import ChatHeader from "./ChatHeader";
import { getUser } from "../../requests/users";
export default function ChatContainer() {
  const otherUserId = useParams().userId as string;

  const userQuery = useQuery({
    queryKey: ["users", otherUserId],
    queryFn: () => getUser(otherUserId),
  });

  const otherUser = userQuery.data;

  return (
    <section>
      {otherUser && <ChatHeader chatname={otherUser.username} />}
      <div className="mt-16 h-full">
        <Outlet />
      </div>
    </section>
  );
}
