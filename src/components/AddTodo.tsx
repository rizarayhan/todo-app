import { useState } from "react";

interface AddTodoProps {
  onSubmit: (title: string) => void;
}

export default function AddTodo({ onSubmit }: AddTodoProps) {
  const [input, setInput] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!input.trim()) return;

    onSubmit(input);
    setInput("");
  }

  return (
    <form
      className="flex"
      onSubmit={handleSubmit}
    >
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="What needs to be done?"
        className="grow rounded-s-md border border-gray-400 p-2"
      />
      <button
        type="submit"
        className="w-16 rounded-e-md bg-green-700 hover:bg-green-800 text-white"
      >
        Add
      </button>
    </form>
  );
}
