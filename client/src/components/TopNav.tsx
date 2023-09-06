import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoltLightning,
  faPlus,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import CreateChannel from "../features/CreateChannel/CreateChannel";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function TopNav() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {
        showModal && <CreateChannel handleClose={() => setShowModal(false)} />
      }
      <nav className="z-20 fixed top-0 left-0 w-full h-16 flex items-center justify-between bg-cyan-500 text-white p-4 text-2xl">
        <Link to={"/"}>
          <h1 className="flex gap-2 items-center text-white">
            <FontAwesomeIcon icon={faBoltLightning} />
            Synapse
          </h1>
        </Link>
        <div className="flex gap-4">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 text-xl"
          >
            <FontAwesomeIcon icon={faPlus} />
            Create
          </button>
          <Link to={"/profile"}>
            <h1 className="text-white">
              <FontAwesomeIcon icon={faUserCircle} />
            </h1>
          </Link>
        </div>
      </nav>
    </>
  );
}
