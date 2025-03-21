import { Container, Grid2 as Grid } from "@mui/material";

import { Todolists } from "@/features/Todolists/ui/Todolists";
import {
  changeTodolistTitleAC,
  createTodolistAC,
  removeTodolistAC,
} from "@/features/Todolists/model/slices/todolists-reducer";
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  createTaskAC,
  removeTaskAC,
} from "@/features/Todolists/model/slices/tasks-reducer";
import { useAppDispatch } from "@/common/hooks";

import { nanoid } from "@reduxjs/toolkit";
import { CreateItemForm } from "@/features/CreateItemForm";
import { useEffect, useState } from "react";

import { Todolist } from "@/features/Todolists/api/api";
import { todolistsApi } from "@/features/Todolists/api/todolistsApi";
import { tasksApi } from "@/features/Todolists/api/tasksApi";
import { TasksState } from "@/features/Todolists/model/types/todolist";

import { TaskStatus } from "@/common/enums";

export const MainPage = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([]);
  useEffect(() => {
    todolistsApi.getTodolists().then((res) => {
      console.log("getTodolists res.data---", res.data);
      const todolists = res.data;
      setTodolists(todolists);
      todolists.forEach((todolist) => {
        tasksApi.getTasks(todolist.id).then((res) => {
          console.log("getTasks todolist.id---", todolist.id);
          console.log("getTasks res.data---", res.data);
          setTasks((prevTasks) => {
            return { ...prevTasks, [todolist.id]: res.data.items };
          });
        });
      });
    });
  }, []);

  const [tasks, setTasks] = useState<TasksState>({});

  const dispatch = useAppDispatch();
  const createTodolist = (title: string) => {
    const id = nanoid();
    dispatch(createTodolistAC({ id, title }));
    todolistsApi.createTodolist(title).then((res) => {
      setTodolists([{ ...res.data.data.item }, ...todolists]);
      console.log(res.data.data?.item);
    });
  };
  const removeTodolist = (id: string) => {
    dispatch(removeTodolistAC({ id }));
    todolistsApi.deleteTodolist(id).then((res) => {
      setTodolists([...todolists.filter((tl) => tl.id !== id)]);

      console.log(res.data);
    });
  };
  const changeTodolistTitle = (id: string, title: string) => {
    dispatch(changeTodolistTitleAC({ id, title }));

    todolistsApi.changeTodolistTitle({ id, title }).then((res) => {
      setTodolists([...todolists.map((tl) => (tl.id === id ? { ...tl, title } : tl))]);
      console.log(res.data);
    });
  };
  const createTask = ({ todolistId, title }: { todolistId: string; title: string }) => {
    // dispatch(
    //   createTaskAC({
    //     todolistId,
    //     title,
    //   }));
    tasksApi.createTask({ todolistId, title }).then((res) => {
      console.log("createTask", res.data);
      setTasks({ ...tasks, [todolistId]: [res.data.data.item, ...tasks[todolistId]] });
    });
  };

  const changeTaskTitle = ({ todolistId, taskId, title }: { todolistId: string; taskId: string; title: string }) => {
    // dispatch(
    //   changeTaskTitleAC({
    //     todolistId,
    //     taskId,
    //     title,
    //   }),
    // );
    const index = todolists.findIndex((tl) => tl.id === todolistId);
    const task = tasks[todolistId][index];

    tasksApi.updateTask({ todolistId, taskId, model: { ...task, title } }).then((res) => {
      console.log("changeTaskTitle updateTask res.data", res.data);

      setTasks({
        ...tasks,
        [todolistId]: [...tasks[todolistId].map((t) => (t.id === taskId ? res.data.data.item : t))],
      });
    });
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
    //   dispatch(
    //     changeTaskStatusAC({
    //       todolistId,
    //       taskId,
    //       isDone,
    //     }),
    //   );

    const index = todolists.findIndex((tl) => tl.id === todolistId);
    const task = tasks[todolistId][index];

    tasksApi
      .updateTask({
        todolistId,
        taskId,
        model: { ...task, status: isDone === false ? TaskStatus.New : TaskStatus.Completed },
      })
      .then((res) => {
        console.log("changeTaskStatus updateTask res.data", res.data);
        setTasks({
          ...tasks,
          [todolistId]: [...tasks[todolistId].map((t) => (t.id === taskId ? res.data.data.item : t))],
        });
      });
  };

  const removeTask = ({ todolistId, taskId }: { todolistId: string; taskId: string }) => {
    // dispatch(
    //   removeTaskAC({
    //     todolistId,
    //     taskId,
    //   }),
    // );
    tasksApi.deleteTask({ todolistId, taskId }).then((res) => {
      console.log("removeTask res.data", res.data);
    });
  };
  return (
    <Container maxWidth={"lg"}>
      <Grid container sx={{ mb: "30px" }}>
        <CreateItemForm onCreateItem={createTodolist} />
      </Grid>
      <Grid container spacing={4}>
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
