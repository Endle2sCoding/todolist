import { TodolistItem } from "./TodolistItem";

import s from "./Todolists.module.scss";
interface TodolistsProps {
  className?: string;
}
export type Task = {
  id: number;
  title: string;
  isDone: boolean;
};
export const Todolists = ({ className }: TodolistsProps) => {
  const tasks1: Task[] = [
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false },
  ];
  return (
    <div className={`${s.todolists} ${className ? className : ""}`}>
      {new Array(3).fill("").map((_, i) => {
        return (
          <TodolistItem
            title="123"
            key={i}
            tasks={tasks1}
          />
        );
      })}
      <div>Todolists</div>
    </div>
  );
};
