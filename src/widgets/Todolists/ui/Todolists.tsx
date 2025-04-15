import { useState } from "react";
import { TodolistItem } from "./TodolistItem";
import s from "./Todolists.module.scss";
import { v1 } from "uuid";
import { CreateItemForm } from "@/features/CreateItemForm";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";

interface TodolistsProps {
  className?: string;
}

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};
export type TasksState = Record<string, Task[]>;
export type FilterTypes = "all" | "active" | "competed";
export type Todolist = {
  id: string;
  title: string;
  filter: FilterTypes;
};
export const Todolists = ({ className }: TodolistsProps) => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, setTodolists] = useState<Todolist[]>([
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]);

  const [tasks, setTasks] = useState<TasksState>({
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
  const [error, setError] = useState<string | null>(null);

  const deleteTodolist = (todolistId: string) => {
    setTodolists([...todolists.filter((tl) => tl.id !== todolistId)]);
    delete tasks[todolistId];
    setTasks({ ...tasks });
    console.log(tasks);
  };
  const createTodolist = (title: string) => {
    const id = v1();
    setTodolists([...todolists, { id: id, title: title, filter: "all" }]);
    setTasks({ ...tasks, [id]: [] });
  };
  const changeTodolistTitle = (todolistId: string, title: string) => {
    setTodolists([
      ...todolists.map((tl) =>
        tl.id === todolistId ? { ...tl, title: title } : tl
      ),
    ]);
  };
  const changeTaskFilter = (taskId: string, filter: FilterTypes) => {
    setTodolists([
      ...todolists.map((tl) =>
        tl.id === taskId ? { ...tl, filter: filter } : tl
      ),
    ]);
  };

  const removeTask = (taskId: string, todolistId: string) => {
    setTasks({
      ...tasks,
      [todolistId]: [...tasks[todolistId].filter((t) => t.id !== taskId)],
    });
  };
  const createTask = (title: string, todolistId: string) => {
    if (title.trim().length > 0) {
      setTasks({
        ...tasks,
        [todolistId]: [
          { id: v1(), title: title, isDone: false },
          ...tasks[todolistId],
        ],
      });
    } else {
      setError("Title is required");
    }
  };
  const changeTaskStatus = (
    taskId: string,
    status: boolean,
    todolistId: string
  ) => {
    setTasks({
      ...tasks,
      [todolistId]: [
        ...tasks[todolistId].map((t) =>
          t.id === taskId ? { ...t, isDone: status } : t
        ),
      ],
    });
  };
  const changeTaskTitle = (
    taskId: string,
    title: string,
    todolistId: string
  ) => {
    setTasks({
      ...tasks,
      [todolistId]: [
        ...tasks[todolistId].map((t) =>
          t.id === taskId ? { ...t, title: title } : t
        ),
      ],
    });
  };

  return (
    <div className={`${s.todolists} ${className ? className : ""}`}>
      <Container
        maxWidth={"lg"}
        sx={{ mb: "30px" }}
      >
        <Grid container>
          <CreateItemForm createItem={createTodolist} />
        </Grid>
      </Container>
      <Container maxWidth={"lg"}>
        <Grid
          container
          spacing={4}
        >
          {todolists.map((tl) => {
            let filtredTasks = tasks[tl.id];
            if (tl.filter === "active") {
              filtredTasks = tasks[tl.id].filter((t) => t.isDone);
            }
            if (tl.filter === "competed") {
              filtredTasks = tasks[tl.id].filter((t) => !t.isDone);
            }
            return (
              <Paper sx={{ p: "0 20px 20px 20px" }}>
                <TodolistItem
                  key={tl.id}
                  title={tl.title}
                  tasks={filtredTasks}
                  removeTask={removeTask}
                  changeTaskFilter={changeTaskFilter}
                  createTask={createTask}
                  changeTaskStatus={changeTaskStatus}
                  error={error}
                  setError={setError}
                  filter={tl.filter}
                  todolist={tl}
                  deleteTodolist={deleteTodolist}
                  changeTaskTitle={changeTaskTitle}
                  changeTodolistTitle={changeTodolistTitle}
                />
              </Paper>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};
