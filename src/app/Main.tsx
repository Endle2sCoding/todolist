import { CreateItemForm } from "@/common/components";

import { Container, Grid2 as Grid } from "@mui/material";

import { Todolists } from "@/features/Todolists/ui/Todolists";
import { useReducer, useState } from "react";
import { TasksState } from "@/features/Todolists/model/types/todolist";
import {
  changeTodolistTitleAC,
  createTodolistAC,
  removeTodolistAC,
  todolistsReducer,
} from "@/features/Todolists/model/todolists-reducer";

export const Main = () => {
  const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, []);
  const [tasks, setTasks] = useState<TasksState>({});

  const createTodolist = (title: string) => {
    dispatchToTodolists(createTodolistAC(title));
  };
  const removeTodolist = (id: string) => {
    dispatchToTodolists(removeTodolistAC(id));
  };
  const changeTodolistTitle = (id: string, title: string) => {
    dispatchToTodolists(changeTodolistTitleAC({ id, title }));
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
          removeTodolist={removeTodolist}
          changeTodolistTitle={changeTodolistTitle}
        />
      </Grid>
    </Container>
  );
};
