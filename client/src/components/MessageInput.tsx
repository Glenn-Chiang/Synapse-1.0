import { useRef } from "react";

type props = {
  onSend: (content: string) => void;
  onType: () => void
}

export default function MessageInput({ onSend, onType }: props) {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    const inputField = inputRef.current;
    if (event.key === "Enter") {
      if (!inputField) {
        return;
      }
      onSend(inputField.value);
      inputRef.current.value = "";
    }
  };
  
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = () => {
    onType()
  }

  return (
    <div className="fixed bottom-0 w-2/3 bg-white p-4 flex justify-center">
      <input
        ref={inputRef}
        autoFocus
        placeholder="Type something..."
        className="w-11/12 rounded-full p-3 bg-slate-100"
        onKeyDown={handleKeyDown}
        onChange={handleChange}
      />
    </div>
  );
}
