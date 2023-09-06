import { ChangeEvent } from "react";

type props = {
  placeholder: string;
  handleSearch: (inputValue: string) => void
}

export default function SearchBar({placeholder, handleSearch}: props) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    handleSearch(inputValue)
  }

  return (
    <div className="fixed w-full z-10">
      <input
        autoFocus
        onChange={handleChange}
        className="w-full p-4 bg-slate-200 shadow focus:outline-none"
        placeholder={placeholder}
      />
    </div>
  );
}
