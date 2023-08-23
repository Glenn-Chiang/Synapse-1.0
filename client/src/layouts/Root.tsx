import { Outlet, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoltLightning, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { QueryClient, QueryClientProvider } from "react-query";


export default function Root() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <TopNav/>
      <div className="pt-16">
        <Outlet />
      </div>
    </QueryClientProvider>
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
