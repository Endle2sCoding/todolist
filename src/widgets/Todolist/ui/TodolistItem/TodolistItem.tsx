import { type ChangeEvent } from "react";
import type { FilterType, TaskType } from "../../model/types/todolist";
import { CreateItemForm } from "@/features/CreateItemForm";
import { EditableSpan } from "@/features/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import { containerSx } from "./TodolistItem.styles";

interface TodolistItemProps {
  title: string;
  todolistId: string;
  tasks: TaskType[];
  deleteTask: ({
    todolistId,
    taskId,
  }: {
    todolistId: string;
    taskId: string;
  }) => void;
  filter: FilterType;
  changeFilter: ({
    filter,
    todolistId,
  }: {
    filter: FilterType;
    todolistId: string;
  }) => void;
  createTask: ({
    todolistId,
    title,
  }: {
    todolistId: string;
    title: string;
  }) => void;
  changeTaskStatus: ({
    todolistId,
    taskId,
    status,
  }: {
    todolistId: string;
    taskId: string;
    status: boolean;
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
  deleteTodolist: (todolistId: string) => void;
  createTotolist: (title: string) => void;
  changeTodolistTitle: ({
    todolistId,
    title,
  }: {
    todolistId: string;
    title: string;
  }) => void;
  className?: string;
}
const fBtn: FilterType[] = ["all", "active", "completed"];
export const TodolistItem = ({
  todolistId,
  title,
  tasks,
  filter,
  changeFilter,
  deleteTask,
  createTask,
  changeTaskStatus,
  changeTaskTitle,
  deleteTodolist,
  changeTodolistTitle,
  className,
}: TodolistItemProps) => {
  const createTaskHandler = (title: string) => {
    createTask({ todolistId, title: title });
  };
  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle({ todolistId, title });
  };

  return (
    <div className={`${className ? className : ""}`}>
      <div>
        <EditableSpan
          value={title}
          changeValue={changeTodolistTitleHandler}
        />
        <IconButton onClick={() => deleteTodolist(todolistId)}>
          <DeleteIcon />
        </IconButton>
      </div>

      <CreateItemForm createItem={createTaskHandler} />
      <List>
        {tasks.length !== 0 ? (
          tasks.map((t) => {
            const changeTaskTitleHandler = (title: string) => {
              changeTaskTitle({ todolistId, taskId: t.id, title: title });
            };
            return (
              <ListItem
                key={t.id}
                className={t.isDone ? "is-done" : ""}
                sx={{
                  p: 0,
                  justifyContent: "space-between",
                  opacity: t.isDone ? 0.5 : 1,
                }}
              >
                <input
                  type="checkbox"
                  checked={t.isDone}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    changeTaskStatus({
                      todolistId,
                      taskId: t.id,
                      status: e.currentTarget.checked,
                    })
                  }
                />
                <EditableSpan
                  value={t.title}
                  changeValue={changeTaskTitleHandler}
                />

                <IconButton
                  onClick={() => deleteTask({ todolistId, taskId: t.id })}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            );
          })
        ) : (
          <div>Тасок нет</div>
        )}
      </List>
      <Box sx={containerSx}>
        {fBtn.map((b) => (
          <Button
            key={b}
            variant={filter === `${b}` ? "outlined" : "text"}
            color={
              `${b}` === "all"
                ? "inherit"
                : `${b}` === "active"
                ? "primary"
                : "secondary"
            }
            onClick={() => {
              changeFilter({ filter: b, todolistId });
            }}
          >
            {b.charAt(0).toUpperCase() + b.slice(1)}
          </Button>
        ))}
      </Box>
    </div>
  );
};
