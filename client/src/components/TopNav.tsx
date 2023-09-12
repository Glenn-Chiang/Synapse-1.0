import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconDefinition,
  faBoltLightning,
  faComment,
  faComments,
  faNetworkWired,
  faSignOut,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";

export default function TopNav() {
  return (
    <nav className="z-20 fixed top-0 left-0 w-full h-16 flex items-center justify-between bg-cyan-500 text-white p-4">
      <Link to={"/"}>
        <h1 className="flex gap-2 items-center text-white text-2xl">
          <FontAwesomeIcon icon={faBoltLightning} />
          Synapse
        </h1>
      </Link>
      <div className="flex gap-4">
        <NavIcon to="/channels" label="My Channels" icon={faComments} />
        <NavIcon to="/chats" label="My Chats" icon={faComment} />
        <NavIcon to="/explore" label="Explore Channels" icon={faNetworkWired} />
        <NavIcon to="/users" label="Find Users" icon={faUsers}/>
        <NavIcon to="logout" icon={faSignOut} />
      </div>
    </nav>
  );
}

type NavIconProps = {
  to: string;
  label?: string;
  icon: IconDefinition;
};

function NavIcon({ to, label: text, icon }: NavIconProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex gap-2 items-center px-4 py-2 rounded-full text-lg hover:bg-cyan-600 ${
          isActive && "bg-cyan-600"
        }`
      }
    >
      <FontAwesomeIcon icon={icon} />
      {text}
    </NavLink>
  );
}
