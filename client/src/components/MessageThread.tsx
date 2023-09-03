import { IncomingMessage, OutgoingMessage } from "./Message";
import { Message } from "../types";

export default function MessageThread({ messages }: { messages: Message[] }) {
  const currentUserId = localStorage.getItem("userId");

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
