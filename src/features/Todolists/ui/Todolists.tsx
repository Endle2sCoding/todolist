import { TodolistItem } from "@/features/Todolists/ui/TodolistItem/TodolistItem";
import { Grid2 as Grid, Paper } from "@mui/material";
import { TodolistType } from "../model/types/todolist";

export const Todolists = ({
  todolists,
  removeTodolist,
  changeTodolistTitle,
}: {
  todolists: TodolistType[];
  removeTodolist: (id: string) => void;
  changeTodolistTitle: ( id: string,title: string ) => void;
}) => {
  return (
    <>
      {todolists?.map((tl) => {
        return (
          <Grid key={tl.id}>
            <Paper sx={{ p: "0 20px 20px 20px" }}>
              <TodolistItem
                todolist={tl}
                removeTodolist={removeTodolist}
                changeTodolistTitle={changeTodolistTitle}
              />
            </Paper>
          </Grid>
        );
      })}
    </>
  );
};
