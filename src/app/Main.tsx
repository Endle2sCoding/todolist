import { CreateItemForm } from "@/common/components";

import { Container, Grid2 as Grid } from "@mui/material";

import { Todolists } from "@/features/Todolists/ui/Todolists";
import { useReducer } from "react";
import {
  changeTodolistTitleAC,
  createTodolistAC,
  removeTodolistAC,
  todolistsReducer,
} from "@/features/Todolists/model/todolists-reducer";
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  createTaskAC,
  removeTaskAC,
  tasksReducer,
} from "@/features/Todolists/model/tasks-reducer";

export const Main = () => {
  const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, []);
  const [tasks, dispatchToTasks] = useReducer(tasksReducer, {});

  const createTodolist = (title: string) => {
    dispatchToTodolists(createTodolistAC(title));
  };
  const removeTodolist = (id: string) => {
    dispatchToTodolists(removeTodolistAC(id));
  };
  const changeTodolistTitle = (id: string, title: string) => {
    dispatchToTodolists(changeTodolistTitleAC({ id, title }));
  };
  const createTask = ({
    todolistId,
    title,
  }: {
    todolistId: string;
    title: string;
  }) => {
    dispatchToTasks(
      createTaskAC({
        todolistId,
        title,
      })
    );
  };

  const removeTask = ({
    todolistId,
    taskId,
  }: {
    todolistId: string;
    taskId: string;
  }) => {
    dispatchToTasks(
      removeTaskAC({
        todolistId,
        taskId,
      })
    );
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
    dispatchToTasks(
      changeTaskTitleAC({
        todolistId,
        taskId,
        title,
      })
    );
  };
  const changeTaskStatus = ({
    todolistId,
    taskId,
    isDone,
  }: {
    todolistId: string;
    taskId: string;
    isDone: boolean;
  }) => {
    dispatchToTasks(
      changeTaskStatusAC({
        todolistId,
        taskId,
        isDone,
      })
    );
  };
  return (
    <Container maxWidth={"lg"}>
      <Grid
        container
        sx={{ mb: "30px" }}
      >
        <CreateItemForm onCreateItem={createTodolist} />
      </Grid>
      <Grid
        container
        spacing={4}
      >
        <Todolists
          todolists={todolists}
          tasks={tasks}
          removeTodolist={removeTodolist}
          changeTodolistTitle={changeTodolistTitle}
          createTask={createTask}
          removeTask={removeTask}
          changeTaskTitle={changeTaskTitle}
          changeTaskStatus={changeTaskStatus}
        />
      </Grid>
    </Container>
  );
};
