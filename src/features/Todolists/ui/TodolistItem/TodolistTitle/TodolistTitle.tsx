import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan";

import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import s from "./TodolistTitle.module.css";
import { TodolistType } from "@/features/Todolists/model/types/todolist";
import { Todolist } from "@/features/Todolists/api/api";

type Props = {
  todolist: Todolist;
  removeTodolist: (id: string) => void;
  changeTodolistTitle: (id: string, title: string) => void;
};

export const TodolistTitle = ({ todolist, removeTodolist, changeTodolistTitle }: Props) => {
  const deleteTodolist = () => {
    removeTodolist(todolist.id);
  };

  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle(todolist.id, title);
  };

  return (
    <div className={s.container}>
      <h3>
        <EditableSpan value={todolist.title} onChange={changeTodolistTitleHandler} />
      </h3>
      <IconButton onClick={deleteTodolist}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};
