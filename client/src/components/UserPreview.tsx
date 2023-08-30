import { useNavigate } from "react-router-dom";
import { User } from "../types";

export default function UserPreview({ user }: { user: User }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/chats/${user.id}`, { state: { chatname: user.username } });
  };

  return (
    <article
      onClick={handleClick}
      className="p-2 h-20 w-full shadow flex items-center gap-2 hover:bg-slate-200"
    >
      <h2>{user.username}</h2>
    </article>
  );
}
