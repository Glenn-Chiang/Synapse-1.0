import { Outlet, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoltLightning,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import UserContext from "../contexts/UserContext";
import { useQuery } from "react-query";
import { getUser } from "../requests/users";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

export default function App() {
  const userId = localStorage.getItem("userId");
  const {
    isLoading,
    isError,
    data: user,
  } = useQuery({
    queryKey: ["users", userId],
    queryFn: () => (userId ? getUser(userId) : null),
  });

  return (
    <UserContext.Provider value={user}>
      <TopNav />
      <div className="pt-16">
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <ErrorMessage message="Error loading user" />
        ) : (
          <Outlet />
        )}
      </div>
    </UserContext.Provider>
  );
}

function TopNav() {
  return (
    <nav className="z-10 fixed top-0 left-0 w-full h-16 flex items-center justify-between bg-cyan-500 text-white p-4 text-2xl">
      <Link to={"/"}>
        <h1 className="flex gap-2 items-center text-white">
          <FontAwesomeIcon icon={faBoltLightning} />
          Synapse
        </h1>
      </Link>
      <Link to={"/profile"}>
        <h1 className="text-white">
          <FontAwesomeIcon icon={faUserCircle} />
        </h1>
      </Link>
    </nav>
  );
}
