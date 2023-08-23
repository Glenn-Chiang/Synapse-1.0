import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chat } from "../../types";


function Chats() {
  const chats: Chat[] = [
    {
      id: "1",
      users: [
        {
          id: "1",
          username: "Glenn",
        },
        {
          id: "2",
          username: "024GHOST",
        },
      ],
    },
  ];
  
  return (
    <main>
      <h1 className="w-screen p-2 flex items-center gap-2 shadow">
        <FontAwesomeIcon icon={faCommentDots} />
        Chats
      </h1>
      <ChatList chats={chats} />
    </main>
  );
}

type ChatListProps = {
  chats: Chat[];
};
function ChatList({ chats }: ChatListProps) {
  return (
    <ul>
      {chats.map((chat) => (
        <li key={chat.id}>
          <ChatPreview chat={chat}/>
        </li>
      ))}
    </ul>
  );
}

type ChatPreviewProps = {
  chat: Chat
}

function ChatPreview({chat}: ChatPreviewProps) {
  return (
    <>
      
    </>
  )
}

export default Chats;
