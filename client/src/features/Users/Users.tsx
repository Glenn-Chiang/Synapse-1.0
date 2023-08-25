import { faSearch, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import SearchBar from "../../components/Searchbar";

export default function Users() {
  const [filterShown, setFilterShown] = useState(false);

  return (
    <main>
      <div className="w-full p-2 flex items-center justify-between gap-2 shadow">
        <h1 className="flex gap-2 items-center text-cyan-500">
          <FontAwesomeIcon icon={faUsers} />
          Users
        </h1>
        <button
          onClick={() => setFilterShown((prev) => !prev)}
          className="p-2 rounded-full w-10 hover:bg-slate-200"
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      {filterShown && <SearchBar placeholder="Search users..." />}
      <div className="">
        <Outlet />
      </div>
    </main>
  );
}
