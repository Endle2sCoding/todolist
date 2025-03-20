

import { Container, Grid2 as Grid } from "@mui/material";

import { Todolists } from "@/features/Todolists/ui/Todolists";
import {
  changeTodolistTitleAC,
  createTodolistAC,
  removeTodolistAC,
  selectTodolists,
} from "@/features/Todolists/model/todolists-reducer";
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  createTaskAC,
  removeTaskAC,
  selectTasks,
} from "@/features/Todolists/model/tasks-reducer";
import { useAppDispatch, useAppSelector } from "@/common/hooks";

import { nanoid } from "@reduxjs/toolkit";
import { CreateItemForm } from "@/features/CreateItemForm";

export const Main = () => {
  const todolists = useAppSelector(selectTodolists);
  const tasks = useAppSelector(selectTasks);

  const dispatch = useAppDispatch();
  const createTodolist = (title: string) => {
    const id = nanoid();
    dispatch(createTodolistAC({ id, title }));
  };
  const removeTodolist = (id: string) => {
    dispatch(removeTodolistAC({ id }));
  };
  const changeTodolistTitle = (id: string, title: string) => {
    dispatch(changeTodolistTitleAC({ id, title }));
  };
  const createTask = ({
    todolistId,
    title,
  }: {
    todolistId: string;
    title: string;
  }) => {
    dispatch(
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
    dispatch(
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
    dispatch(
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
    dispatch(
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
