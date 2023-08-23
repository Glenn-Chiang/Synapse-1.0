import { faTv } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Channels() {
  return (
    <main>
      <h1 className="w-screen p-2 flex items-center gap-2 shadow">
        <FontAwesomeIcon icon={faTv} />
Channels
      </h1>
      <nav className="flex gap-2 p-2"></nav>
    </main>
  );
}
