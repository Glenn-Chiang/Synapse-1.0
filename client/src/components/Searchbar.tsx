import { useEffect, useRef } from "react";

export default function SearchBar({placeholder}: {placeholder: string}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div>
      <input
        ref={inputRef}
        className="w-full p-4 bg-slate-100 shadow-inner focus:outline-none"
        placeholder={placeholder}
      />
    </div>
  );
}
