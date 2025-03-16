import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan";
import { getListItemSx } from "./TaskItem.styles";
import { Checkbox, IconButton, ListItem } from "@mui/material";
import { ChangeEvent } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { DomainTask } from "@/features/Todolists/api/tasksApi.types";
import { TaskStatus } from "@/common/enums";
import { TodolistType } from "@/features/Todolists/model/types/todolist";

type Props = {
  task: DomainTask;
  todolistId: string;
  todolist: TodolistType;
};

export const TaskItem = ({ task, todolistId, todolist }: Props) => {
  const deleteTask = () => {};

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {};

  const changeTaskTitle = (title: string) => {};

  return (
    <ListItem sx={getListItemSx(task.status === TaskStatus.Completed)}>
      <div>
        <Checkbox
          checked={task.status === TaskStatus.Completed}
          onChange={changeTaskStatus}
        />
        <EditableSpan
          value={task.title}
          onChange={changeTaskTitle}
        />
      </div>
      <IconButton onClick={deleteTask}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};
