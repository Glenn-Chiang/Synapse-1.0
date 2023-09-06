import { ChangeEvent } from "react";

type props = {
  placeholder: string;
  position: string;
  handleSearch: (inputValue: string) => void
}

export default function SearchBar({placeholder, position, handleSearch}: props) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    handleSearch(inputValue)
  }

  return (
    <div className={`w-full z-10 ${position}`}>
      <input
        autoFocus
        onChange={handleChange}
        className={`w-full p-4 bg-slate-200 shadow focus:outline-none ${position}`}
        placeholder={placeholder}
      />
    </div>
  );
}
