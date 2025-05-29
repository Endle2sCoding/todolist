import { useState } from "react";
import type {
  FilterType,
  TaskType,
  TodolistType,
} from "../model/types/todolist";
import { TodolistItem } from "./TodolistItem/TodolistItem";
import { v1 } from "uuid";

interface TodolistProps {
  className?: string;
}
export const Todolist = ({ className }: TodolistProps) => {
  const todolistId1 = v1();
  const todolistId2 = v1();
  const [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]);

  const [tasks, setTasks] = useState<Record<string, TaskType[]>>({
    [todolistId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "Rest API", isDone: true },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
  });

  const createTask = ({
    todolistId,
    title,
  }: {
    todolistId: string;
    title: string;
  }) => {
    setTasks({
      ...tasks,
      [todolistId]: [
        { id: v1(), title: title, isDone: false },
        ...tasks[todolistId],
      ],
    });
  };

  const deleteTask = ({
    todolistId,
    taskId,
  }: {
    todolistId: string;
    taskId: string;
  }) => {
    setTasks({
      ...tasks,
      [todolistId]: [...tasks[todolistId].filter((t) => t.id !== taskId)],
    });
  };

  const changeFilter = ({
    filter,
    todolistId,
  }: {
    filter: FilterType;
    todolistId: string;
  }) => {
    setTodolists([
      ...todolists.map((tl) => (tl.id === todolistId ? { ...tl, filter } : tl)),
    ]);
  };
  const changeTaskStatus = ({
    todolistId,
    taskId,
    status,
  }: {
    todolistId: string;
    taskId: string;
    status: boolean;
  }) => {
    setTasks({
      ...tasks,
      [todolistId]: [
        ...tasks[todolistId].map((t) =>
          t.id === taskId ? { ...t, isDone: status } : t
        ),
      ],
    });
  };
  return (
    <div
      style={{ display: "flex", padding: "15px" }}
      className={`${className ? className : ""}`}
    >
      {todolists.map((tl) => {
        let filtredTasks = tasks[tl.id];
        if (tl.filter === "active") {
          filtredTasks = tasks[tl.id].filter((t) => !t.isDone);
        }
        if (tl.filter === "completed") {
          filtredTasks = tasks[tl.id].filter((t) => t.isDone);
        }
        return (
          <TodolistItem
            key={tl.id}
            todolistId={tl.id}
            title={tl.title}
            filter={tl.filter}
            changeFilter={changeFilter}
            tasks={filtredTasks}
            deleteTask={deleteTask}
            createTask={createTask}
            changeTaskStatus={changeTaskStatus}
          />
        );
      })}
    </div>
  );
};
