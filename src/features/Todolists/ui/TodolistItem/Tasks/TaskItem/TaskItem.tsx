import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan";
import { getListItemSx } from "./TaskItem.styles";
import { Checkbox, IconButton, ListItem } from "@mui/material";
import { ChangeEvent } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Task, TodolistType } from "@/features/Todolists/model/types/todolist";

type Props = {
  task: Task;
  todolistId: string;
  todolist: TodolistType;
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

export const TaskItem = ({
  task,
  todolistId,
  removeTask,
  changeTaskTitle,
  changeTaskStatus,
}: Props) => {
  const removeTaskHandler = () => {
    removeTask({ todolistId, taskId: task.id });
  };

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    changeTaskStatus({
      todolistId,
      taskId: task.id,
      isDone: e.currentTarget.checked,
    });
  };

  const changeTaskTitleHandler = (title: string) => {
    changeTaskTitle({ todolistId, taskId: task.id, title });
  };

  return (
    <ListItem
      // sx={getListItemSx(task.status === TaskStatus.Completed)}
      sx={getListItemSx(task.isDone)}
    >
      <div>
        <Checkbox
          // checked={task.status === TaskStatus.Completed}
          checked={task.isDone}
          onChange={changeTaskStatusHandler}
        />
        <EditableSpan
          value={task.title}
          onChange={changeTaskTitleHandler}
        />
      </div>
      <IconButton onClick={removeTaskHandler}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};
