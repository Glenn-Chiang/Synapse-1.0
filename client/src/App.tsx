import { Outlet, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useState} from 'react'
import {
  faBoltLightning,
  faPlus,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import CreateChat from "./features/CreateChat/CreateChat";

export default function App() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <TopNav handleCreateClick={() => setShowModal(true)}/>
      <div className="pt-16">
        <Outlet />
      </div>
      {showModal && <CreateChat handleClose={() => setShowModal(false)}/>}
    </>
  );
}

function TopNav({handleCreateClick}: {handleCreateClick: () => void}) {
  return (
    <nav className="z-10 fixed top-0 left-0 w-full h-16 flex items-center justify-between bg-cyan-500 text-white p-4 text-2xl">
      <Link to={"/"}>
        <h1 className="flex gap-2 items-center text-white">
          <FontAwesomeIcon icon={faBoltLightning} />
          Synapse
        </h1>
      </Link>
      <button onClick={handleCreateClick} className="flex items-center gap-2 text-xl">
        <FontAwesomeIcon icon={faPlus}/>
        Create
      </button>
      <Link to={"/profile"}>
        <h1 className="text-white">
          <FontAwesomeIcon icon={faUserCircle} />
        </h1>
      </Link>
    </nav>
  );
}
