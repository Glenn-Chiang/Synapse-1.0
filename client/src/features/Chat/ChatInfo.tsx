import { useOutletContext } from "react-router-dom";
import { Chat } from "../../types";
import UserPreview from "../../components/UserPreview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarPlus,
  faUserPen,
  faUserShield,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export default function ChatInfo() {
  const chat = useOutletContext() as Chat;

  return (
    <section className="p-4 bg-slate-100 flex flex-col gap-4">
      <div>
        <h2>Description</h2>
        <p>{chat.description}</p>
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <h2 className="flex gap-2 items-center py-2">
            <FontAwesomeIcon icon={faUserPen} />
            Created by
          </h2>
          <UserPreview user={chat.creator} />
        </div>
        <div className="flex-1">
          <h2 className="flex gap-2 items-center py-2">
            <FontAwesomeIcon icon={faCalendarPlus} />
            Created on
          </h2>
          <p className="py-2">{chat.dateCreated}</p>
        </div>
      </div>
      <div>
        <h2 className="flex gap-2 items-center py-2">
          <FontAwesomeIcon icon={faUserShield} />
          Admins ({chat.admins.length})
        </h2>
        <ul>
          {chat.admins.map((user) => (
            <UserPreview key={user.id} user={user} />
          ))}
        </ul>
      </div>
      <div>
        <h2 className="flex gap-2 items-center py-2">
          <FontAwesomeIcon icon={faUsers} />
          Members ({chat.members.length})
        </h2>
        <ul>
          {chat.members.map((user) => (
            <UserPreview key={user.id} user={user} />
          ))}
        </ul>
      </div>
    </section>
  );
}
