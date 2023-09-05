import { useRef, useEffect, useState } from "react";
import { Message } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faX } from "@fortawesome/free-solid-svg-icons";

export function OutgoingMessage({ message }: { message: Message }) {
  const ref = useRef<HTMLLIElement>(null);
  useEffect(() => {
    ref.current?.scrollIntoView();
  }, []);

  // const [isSelected, setIsSelected] = useState(false);

  return (
    <li ref={ref} className="self-end flex flex-col items-end relative group">
      <p
        className="bg-cyan-500 text-white p-2 rounded-xl shadow max-w-xs break-words hover:bg-cyan-600 transition"
      >
        {message.text}
      </p>
      <span className="p-2 text-sm text-slate-400">{message.timestamp}</span>
      <MessageTools/>
    </li>
  );
}

function MessageTools() {
  return (
    <div className="hidden group-hover:flex z-10 p-2 rounded-xl bg-white shadow gap-2 absolute -bottom-4">
      <FontAwesomeIcon
        icon={faEdit}
        className="shadow text-white bg-cyan-500 hover:bg-cyan-600 p-2 rounded-md transition"
      />
      <FontAwesomeIcon
        icon={faTrash}
        className="shadow text-white bg-red-500 hover:bg-red-600 p-2 rounded-md transition"
      />
    </div>
  );
}

export function IncomingMessage({ message }: { message: Message }) {
  const ref = useRef<HTMLLIElement>(null);

  const usernameIsShown = message.roomType === "Channel";

  useEffect(() => {
    ref.current?.scrollIntoView();
  }, []);

  return (
    <li ref={ref} className="self-start flex flex-col ">
      {usernameIsShown && (
        <span className="p-2 text-cyan-500 font-medium">
          {message.sender.username}
        </span>
      )}
      <p className="bg-white p-2 rounded-xl shadow max-w-xs break-words">
        {message.text}
      </p>
      <span className="p-2 text-sm text-slate-400">{message.timestamp}</span>
    </li>
  );
}
