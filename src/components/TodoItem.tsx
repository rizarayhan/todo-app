import { Check, PencilIcon, Trash2, X } from "lucide-react";
import type { Todo } from "../type/todo";
import { useState } from "react";

interface TodoItemProps {
  todo: Todo;
  onCompletedChange: (id: number, completed: boolean) => void;
  onEdit: (id: number, title: string) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({ todo, onCompletedChange, onEdit, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState(todo.title);
  function handleEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onEdit(todo.id, input);
    setIsEditing(false);
  }

  return (
    <div className="flex items-center gap-1">
      {isEditing ? (
        <form
          className="flex grow"
          onSubmit={handleEdit}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
            className="grow p-2 border border-gray-400 rounded-md bg-white"
          />
          <button
            type="submit"
            onClick={() => handleEdit}
            className="p-2"
          >
            <Check
              size={20}
              className="text-green-500 hover:text-green-600"
            />
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="p-2"
          >
            <X
              size={20}
              className="text-red-500 hover:text-red-600"
            />
          </button>
        </form>
      ) : (
        <>
          <label className="flex grow items-center gap-2 p-2 border border-gray-400 rounded-md bg-white hover:bg-slate-50">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(e) => onCompletedChange(todo.id, e.target.checked)}
              className="scale-125"
            />
            <span className={todo.completed ? "line-through text-gray-400" : ""}>{todo.title}</span>
          </label>
          <button
            onClick={() => setIsEditing(true)}
            className="p-2"
          >
            <PencilIcon
              size={20}
              className="text-gray-500 hover:text-gray-600"
            />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-2"
          >
            <Trash2
              size={20}
              className="text-gray-500 hover:text-gray-600"
            />
          </button>
        </>
      )}
    </div>
  );
}
