import { TodolistItem } from "@/features/Todolists/ui/TodolistItem/TodolistItem";
import { Grid2 as Grid, Paper } from "@mui/material";
import {
  useGetTodolistsQuery
} from "../api/todolistsApi";


export const Todolists = () => {

  const { data: todolists } = useGetTodolistsQuery();



  return (
    <>

      {todolists?.map((tl) => {
        return (
          <Grid key={tl.id}>
            <Paper sx={{ p: "0 20px 20px 20px" }}>
              <TodolistItem todolist={tl} />
            </Paper>
          </Grid>
        );
      })}
    </>
  );
};
