import { useNavigate } from "react-router-dom";
import { Group } from "../../types";

export default function GroupPreview({ group }: { group: Group }) {
  const lastMessage =
    group.messages.length > 0 && group.messages[group.messages.length - 1];

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/groups/${group.id}`, {
      state: { groupname: group.name },
    });
  };

  return (
    <article
      onClick={handleClick}
      className="p-2 h-20 w-full shadow flex gap-2 hover:bg-slate-200"
    >
      <div className="flex flex-col justify-between w-4/5">
        <h2>{group.name}</h2>
        {lastMessage && <p className="line-clamp-1 py-1">{lastMessage.text}</p>}
      </div>
      <div className="flex flex-col justify-between items-end w-1/5">
        {lastMessage && <span>{lastMessage.timestamp}</span>}
        <span className="rounded-full bg-cyan-500 text-white w-8 h-8 flex justify-center items-center">
          {group.messages.length}
        </span>
      </div>
    </article>
  );
}
