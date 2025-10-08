import { useEffect, useState } from "react";
import type { Todo } from "../type/todo";
import { dummyData } from "../data/todos";

export default function useTodos() {
  const [todos, setTodos] = useState(() => {
    const savedTodos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");
    return savedTodos.length > 0 ? savedTodos : dummyData;
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function setCompletedChange(id: number, completed: boolean) {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, completed } : todo)));
  }

  function addTodo(title: string) {
    setTodos((prevTodos) => [
      ...prevTodos,
      {
        id: Date.now(),
        title,
        completed: false,
      },
    ]);
  }

  function editTodo(id: number, title: string) {
    const updatedTodos = todos.map((prevTodos) => {
      if (prevTodos.id === id) {
        return {
          ...prevTodos,
          title,
        };
      }
      return prevTodos;
    });

    setTodos(updatedTodos);
  }

  function deleteTodo(id: number) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  function deleteAllCompletedTodos() {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  }

  return {
    todos,
    setCompletedChange,
    addTodo,
    editTodo,
    deleteTodo,
    deleteAllCompletedTodos,
  };
}
