import { faPlus, faSearch, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import SearchBar from "../../components/Searchbar";
import { useQuery } from "react-query";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { getGroups } from "../../requests/groupchats";
import GroupPreview from "./GroupPreview";
import { Link } from "react-router-dom";

export default function GroupChats() {
  const userId = localStorage.getItem("userId") as string;

  const {
    isLoading,
    isError,
    data: groupchats,
  } = useQuery({
    queryKey: [userId, "groupchats"],
    queryFn: () => getGroups(userId),
  });

  const [filterShown, setFilterShown] = useState(false);

  return (
    <main className="bg-white">
      <div className="w-full p-2 flex items-center justify-between gap-2 shadow">
        <div className="flex gap-6">
          <h1 className="flex gap-2 items-center text-cyan-500">
            <FontAwesomeIcon icon={faUserGroup} />
            Groups
          </h1>
          <CreateGroupButton/>
        </div>
        <button
          onClick={() => setFilterShown((prev) => !prev)}
          className="p-2 rounded-full w-10 hover:bg-slate-200"
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      {filterShown && <SearchBar placeholder="Search your groups..." />}
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorMessage message="Error fetching groups" />
      ) : groupchats && groupchats.length > 0 ? (
        <ul>
          {groupchats?.map((group) => (
            <li key={group.id}>
              <GroupPreview group={group} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="p-4 shadow">No groups found</p>
      )}
    </main>
  );
}

function CreateGroupButton() {
  return (
    <Link to={'/createGroup'}  className="bg-cyan-500 text-white p-2 rounded-full w-10 h-10 flex justify-center items-center hover:bg-cyan-600">
      <FontAwesomeIcon icon={faPlus}/>
    </Link>
  )
}
