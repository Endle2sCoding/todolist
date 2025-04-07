import { useState } from "react";
import { TodolistItem } from "./TodolistItem";
import s from "./Todolists.module.scss";
import { v1 } from "uuid";

interface TodolistsProps {
  className?: string;
}

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};
export type FilterTypes = "all" | "active" | "competed";
export const Todolists = ({ className }: TodolistsProps) => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
  ]);
  const [filter, setFilter] = useState<FilterTypes>("all");
  const [error, setError] = useState<string | null>(null);

  let filtredTasks = tasks;
  if (filter === "active") {
    filtredTasks = tasks.filter((t) => t.isDone);
  }
  if (filter === "competed") {
    filtredTasks = tasks.filter((t) => !t.isDone);
  }

  const removeTask = (id: string) => {
    setTasks([...tasks.filter((t) => t.id !== id)]);
  };
  const changeTaskFilter = (filter: FilterTypes) => {
    setFilter(filter);
  };

  const createTask = (title: string) => {
    if (title.trim().length > 0) {
      setTasks([...tasks, { id: v1(), title: title, isDone: false }]);
    } else {
      setError("Title is required");
    }
  };

  const changeTaskStatus = (id: string, status: boolean) => {
    setTasks([
      ...tasks.map((t) => (t.id === id ? { ...t, isDone: status } : t)),
    ]);
  };
  return (
    <div className={`${s.todolists} ${className ? className : ""}`}>
          <TodolistItem
            title="Title"
            tasks={filtredTasks}
            removeTask={removeTask}
            changeTaskFilter={changeTaskFilter}
            createTask={createTask}
            changeTaskStatus={changeTaskStatus}
            error={error}
            setError={setError}
            filter={filter}
          />    
    </div>
  );
};
