import { useState } from "react";
import type { FilterType, TaskType } from "../model/types/todolist";
import { TodolistItem } from "./TodolistItem/TodolistItem";
import { v1 } from "uuid";

interface TodolistProps {
  className?: string;
}
export const Todolist = ({ className }: TodolistProps) => {
  const [tasks, setTasks] = useState<TaskType[]>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
  ]);
  const [filter, setFilter] = useState<FilterType>("all");

  const deleteTask = (taskId: string) => {
    setTasks([...tasks.filter((t) => t.id !== taskId)]);
  };

  const createTask = (title: string) => {
    setTasks([{ id: v1(), title: title, isDone: false }, ...tasks]);
  };

  let filtredTasks = tasks;
  if (filter === "active") {
    filtredTasks = tasks.filter((t) => !t.isDone);
  }
  if (filter === "completed") {
    filtredTasks = tasks.filter((t) => t.isDone);
  }
  return (
    <div
      style={{ display: "flex", padding: "15px" }}
      className={`${className ? className : ""}`}
    >
      <TodolistItem
        title="What to learn"
        tasks={filtredTasks}
        deleteTask={deleteTask}
        filter={filter}
        setFilter={setFilter}
        createTask={createTask}
      />
    </div>
  );
};
