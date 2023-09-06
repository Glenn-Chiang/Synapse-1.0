import {
  faBookmark,
  faEdit,
  faThumbsUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


type props = {
  isOwnMessage: boolean;
  toggleEdit?: () => void;
  toggleDelete?: () => void;
};

export default function MessageTools({
  toggleEdit,
  toggleDelete,
  isOwnMessage,
}: props) {
  return (
    <div className="hidden group-hover:flex p-2 rounded-xl bg-white shadow gap-2 absolute -bottom-4">
      <FontAwesomeIcon
        icon={faThumbsUp}
        className="shadow text-white bg-cyan-500 hover:bg-cyan-600 p-2 rounded-md transition"
      />
      <FontAwesomeIcon
        icon={faBookmark}
        className="shadow text-white bg-cyan-500 hover:bg-cyan-600 p-2 rounded-md transition"
      />
      {isOwnMessage && (
        <FontAwesomeIcon
          onClick={toggleEdit}
          icon={faEdit}
          className="shadow text-white bg-cyan-500 hover:bg-cyan-600 p-2 rounded-md transition"
        />
      )}
      {isOwnMessage && (
        <FontAwesomeIcon
          onClick={toggleDelete}
          icon={faTrash}
          className="shadow text-white bg-red-500 hover:bg-red-600 p-2 rounded-md transition"
        />
      )}
    </div>
  );
}
