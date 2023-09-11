import { faSearch, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import SearchBar from "../../components/Searchbar";
import { useQuery } from "react-query";
import { getUsers } from "../../services/users";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import UserPreview from "../../components/UserPreview";

export default function Users() {
  const {
    isLoading,
    isError,
    data: users,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const [filterShown, setFilterShown] = useState(false);

  return (
    <main className="bg-white">
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
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorMessage message="Error fetching users" />
      ) : (
        <ul>
          {users?.map((user) => (
            <UserPreview key={user.id} user={user} />
          ))}
        </ul>
      )}
    </main>
  );
}
