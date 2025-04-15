import { FilterTypes, Task, Todolist } from "./Todolists";
import { ChangeEvent } from "react";
import { CreateItemForm } from "@/features/CreateItemForm";
import { EditableSpan } from "@/features/EditableSpan";
import Button from "@mui/material/Button";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Checkbox } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { containerSx, getListItemSx } from "./TodolistItem.styles";

interface TodolistItemProps {
  title: string;
  tasks: Task[];
  className?: string;
  removeTask: (taksId: string, todolistId: string) => void;
  changeTaskFilter: (taksId: string, filter: FilterTypes) => void;
  changeTaskStatus: (
    taksId: string,
    status: boolean,
    todolistId: string
  ) => void;
  changeTaskTitle: (taksId: string, title: string, todolistId: string) => void;
  changeTodolistTitle: (todolistId: string, title: string) => void;
  createTask: (title: string, todolistId: string) => void;
  error: string | null;
  setError: (value: string | null) => void;
  filter: FilterTypes;
  todolist: Todolist;
  deleteTodolist: (todolistId: string) => void;
}
export const TodolistItem = ({
  title,
  tasks,
  className,
  removeTask,
  changeTaskFilter,
  createTask,
  changeTaskStatus,
  todolist,
  deleteTodolist,
  changeTaskTitle,
  changeTodolistTitle,
}: TodolistItemProps) => {
  const createTaskHandler = (value: string) => {
    createTask(value, todolist.id);
  };
  return (
    <div className={`${className ? className : ""}`}>
      <>
        <EditableSpan
          value={title}
          changeTitle={(value: string) =>
            changeTodolistTitle(todolist.id, value)
          }
        />
        <IconButton onClick={() => deleteTodolist(todolist.id)}>
          <DeleteIcon />
        </IconButton>
      </>
      <CreateItemForm createItem={createTaskHandler} />
      {tasks.length === 0 ? (
        <div>Тасок нет</div>
      ) : (
        <List>
          {tasks.map((t) => (
            <ListItem
              key={t.id}
              sx={getListItemSx(t.isDone)}
            >
              <Checkbox
                checked={t.isDone}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  changeTaskStatus(t.id, e.currentTarget.checked, todolist.id);
                }}
              />
              <EditableSpan
                value={t.title}
                changeTitle={(value: string) =>
                  changeTaskTitle(t.id, value, todolist.id)
                }
              />
              <IconButton onClick={() => removeTask(t.id, todolist.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}
      <Box sx={containerSx}>
        <Button
          variant={todolist.filter === "all" ? "outlined" : "text"}
          color={"inherit"}
          onClick={() => changeTaskFilter(todolist.id, "all")}
        >
          All
        </Button>
        <Button
          variant={todolist.filter === "active" ? "outlined" : "text"}
          color={"primary"}
          onClick={() => changeTaskFilter(todolist.id, "active")}
        >
          Active
        </Button>
        <Button
          variant={todolist.filter === "competed" ? "outlined" : "text"}
          color={"secondary"}
          onClick={() => changeTaskFilter(todolist.id, "competed")}
        >
          Completed
        </Button>
      </Box>
    </div>
  );
};
