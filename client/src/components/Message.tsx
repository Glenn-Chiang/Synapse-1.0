import { Message } from "../types";

function OutgoingMessage({ message }: { message: Message }) {
  return (
    <li className="self-end flex flex-col items-end ">
      <p className="bg-cyan-500 text-white p-2 rounded-xl shadow max-w-xs break-words">
        {message.text}
      </p>
      <span className="p-2 text-sm text-slate-400">{message.timestamp}</span>
    </li>
  );
}

function IncomingMessage({ message }: { message: Message }) {
  return (
    <li className="self-start flex flex-col ">
      <p className="bg-white p-2 rounded-xl shadow max-w-xs break-words">
        {message.text}
      </p>
      <span className="p-2 text-sm text-slate-400">{message.timestamp}</span>
    </li>
  );
}

function Message({message}: {message: Message}) {
  const currentUserId = localStorage.getItem('userId')
  message.sender.id === currentUserId;

  return (
    <li className="self-start flex flex-col ">
      <p className="bg-white p-2 rounded-xl shadow max-w-xs break-words">
        {message.text}
      </p>
      <span className="p-2 text-sm text-slate-400">{message.timestamp}</span>
    </li>
  );
}