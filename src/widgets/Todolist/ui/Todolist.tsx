import { useReducer, useState } from "react";
import type { FilterType, TaskType } from "../model/types/todolist";
import { TodolistItem } from "./TodolistItem/TodolistItem";
import { v1 } from "uuid";
import { CreateItemForm } from "@/features/CreateItemForm";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import {
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  createTodolistAC,
  deleteTodolistAC,
  todolistsReducer,
} from "../model/slices/todolists-reducer";

interface TodolistProps {
  className?: string;
}
export const Todolist = ({ className }: TodolistProps) => {
  const todolistId1 = v1();
  const todolistId2 = v1();
  const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, []);

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
  const changeTaskTitle = ({
    todolistId,
    taskId,
    title,
  }: {
    todolistId: string;
    taskId: string;
    title: string;
  }) => {
    setTasks({
      ...tasks,
      [todolistId]: [
        ...tasks[todolistId].map((t) =>
          t.id === taskId ? { ...t, title } : t
        ),
      ],
    });
  };

  const changeFilter = ({
    filter,
    todolistId,
  }: {
    filter: FilterType;
    todolistId: string;
  }) => {
    dispatchToTodolists(changeTodolistFilterAC({ id: todolistId, filter }));
  };

  const deleteTodolist = (todolistId: string) => {
    dispatchToTodolists(deleteTodolistAC(todolistId));
    delete tasks[todolistId];
  };
  const createTotolist = (title: string) => {
    dispatchToTodolists(createTodolistAC(title));
    setTasks({ [createTodolistAC(title).payload.id]: [], ...tasks });
  };
  const changeTodolistTitle = ({
    todolistId,
    title,
  }: {
    todolistId: string;
    title: string;
  }) => {
    dispatchToTodolists(changeTodolistTitleAC({ id: todolistId, title }));
  };

  return (
    <Container
      maxWidth={"lg"}
      className={`${className ? className : ""}`}
    >
      <Grid
        container
        sx={{ mb: "30px" }}
      >
        <CreateItemForm createItem={createTotolist} />
      </Grid>
      <Grid
        container
        spacing={4}
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
            <Grid key={tl.id}>
              <Paper sx={{ p: "0 20px 20px 20px" }}>
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
                  changeTaskTitle={changeTaskTitle}
                  deleteTodolist={deleteTodolist}
                  createTotolist={createTotolist}
                  changeTodolistTitle={changeTodolistTitle}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
