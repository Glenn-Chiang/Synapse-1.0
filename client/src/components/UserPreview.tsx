import { useNavigate } from "react-router-dom";
import { User } from "../types";

export default function UserPreview({ user }: { user: User }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/channels/${user.id}`, { state: { channelname: user.username } });
  };

  return (
    <article
      onClick={handleClick}
      className="px-2 py-4 rounded shadow-md flex items-center gap-2 hover:bg-slate-200 bg-white"
    >
      <h2>{user.username}</h2>
    </article>
  );
}
