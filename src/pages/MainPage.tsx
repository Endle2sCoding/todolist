import { Container, Grid2 as Grid } from "@mui/material";

import { Todolists } from "@/widgets/Todolists/ui/Todolists";
import {
  changeTodolistTitleAC,
  createTodolistAC,
  removeTodolistAC,
} from "@/widgets/Todolists/model/slices/todolists-reducer";

import { useAppDispatch } from "@/shared/hooks";

import { nanoid } from "@reduxjs/toolkit";
import { CreateItemForm } from "@/features/CreateItemForm";
import { useEffect, useState } from "react";

import { Todolist } from "@/widgets/Todolists/api/api";
import { todolistsApi } from "@/widgets/Todolists/api/todolistsApi";
import { tasksApi } from "@/widgets/Todolists/api/tasksApi";
import { TasksState } from "@/widgets/Todolists/model/types/todolist";
import { TaskStatus } from "@/shared/enums";

export const MainPage = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([]);
  useEffect(() => {
    todolistsApi.getTodolists().then((res) => {
      const todolists = res.data;
      setTodolists(todolists);
      todolists.forEach((todolist) => {
        tasksApi.getTasks(todolist.id).then((res) => {
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
      setTasks({ ...tasks, [id]: [] });
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
    console.log("createTask tasks", tasks);
    tasksApi.createTask({ todolistId, title }).then((res) => {
      if (tasks[todolistId]?.length) {
        setTasks({
          ...tasks,
          [todolistId]: [res.data.data.item, ...tasks[todolistId]],
        });
      } else {
        setTasks({
          ...tasks,
          [todolistId]: [res.data.data.item],
        });
      }
    });
  };

  const changeTaskTitle = ({ todolistId, taskId, title }: { todolistId: string; taskId: string; title: string }) => {
    const index = todolists.findIndex((tl) => tl.id === todolistId);
    const task = tasks[todolistId][index];

    tasksApi.updateTask({ todolistId, taskId, model: { ...task, title } }).then((res) => {
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
    const index = todolists.findIndex((tl) => tl.id === todolistId);
    const task = tasks[todolistId][index];

    tasksApi
      .updateTask({
        todolistId,
        taskId,
        model: { ...task, status: isDone === false ? TaskStatus.New : TaskStatus.Completed },
      })
      .then((res) => {
        setTasks({
          ...tasks,
          [todolistId]: [...tasks[todolistId].map((t) => (t.id === taskId ? res.data.data.item : t))],
        });
      });
  };

  const removeTask = ({ todolistId, taskId }: { todolistId: string; taskId: string }) => {
    tasksApi.deleteTask({ todolistId, taskId }).then(() => {
      setTasks({ ...tasks, [todolistId]: [...tasks[todolistId].filter((t) => t.id !== taskId)] });
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
