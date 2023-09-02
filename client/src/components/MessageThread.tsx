import { IncomingMessage,OutgoingMessage } from "./Message";
import { useMessageSubscription } from "../requests/messages";
import { Message } from "../types";

export default function MessageThread({ messages }: { messages: Message[] }) {
  const currentUserId = localStorage.getItem("userId");

  useMessageSubscription(); // Listen to messages from the server

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
