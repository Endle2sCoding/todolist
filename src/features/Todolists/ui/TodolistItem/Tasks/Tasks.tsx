import {
  TasksType,
  TodolistType,
} from "@/features/Todolists/model/types/todolist";

import { TaskItem } from "@/features/Todolists/ui/TodolistItem/Tasks/TaskItem/TaskItem";
import { List } from "@mui/material";

type Props = {
  todolist: TodolistType;
  tasks: TasksType;
  removeTask: ({
    todolistId,
    taskId,
  }: {
    todolistId: string;
    taskId: string;
  }) => void;
  changeTaskTitle: ({
    todolistId,
    taskId,
    title,
  }: {
    todolistId: string;
    taskId: string;
    title: string;
  }) => void;
  changeTaskStatus: ({
    todolistId,
    taskId,
    isDone,
  }: {
    todolistId: string;
    taskId: string;
    isDone: boolean;
  }) => void;
};
export const Tasks = ({
  todolist,
  removeTask,
  changeTaskTitle,
  changeTaskStatus,
  tasks,
}: Props) => {
  let filtredTasks = tasks[todolist.id];
  if (todolist.filter === "completed") {
    filtredTasks = tasks[todolist.id].filter((t) => t.isDone === true);
  }
  if (todolist.filter === "active") {
    filtredTasks = tasks[todolist.id].filter((t) => t.isDone === false);
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
                  removeTask={removeTask}
                  changeTaskTitle={changeTaskTitle}
                  changeTaskStatus={changeTaskStatus}
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
