import { TaskStatus } from "@/common/enums";
import { useAppDispatch, useAppSelector } from "@/common/hooks";

import { selectTasks } from "@/features/Todolists/model/tasks-selectors";
import { TodolistType } from "@/features/Todolists/model/types/todolist";

import { TaskItem } from "@/features/Todolists/ui/TodolistItem/Tasks/TaskItem/TaskItem";
import { List } from "@mui/material";
import { useEffect } from "react";

type Props = {
  todolist: TodolistType;
};
export const Tasks = ({ todolist }: Props) => {
  const tasks = useAppSelector(selectTasks);

  const dispatch = useAppDispatch();

  useEffect(() => {}, [dispatch, todolist.id]);

  let filtredTasks = tasks[todolist.id];
  if (todolist.filter === "completed") {
    filtredTasks = tasks[todolist.id].filter(
      (t) => t.status === TaskStatus.Completed
    );
  }
  if (todolist.filter === "active") {
    filtredTasks = tasks[todolist.id].filter(
      (t) => t.status === TaskStatus.New
    );
  }
  return (
    <>
      {filtredTasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {filtredTasks &&
            filtredTasks.map((t) => {
              return (
                <TaskItem
                  todolist={todolist}
                  key={t.id}
                  task={t}
                  todolistId={todolist.id}
                />
              );
            })}
        </List>
      )}
    </>
  );
};
