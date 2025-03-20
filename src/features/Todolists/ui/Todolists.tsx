import { TodolistItem } from "@/features/Todolists/ui/TodolistItem/TodolistItem";
import { Grid2 as Grid, Paper } from "@mui/material";
import { TasksType, TodolistType } from "../model/types/todolist";

export const Todolists = ({
  todolists,
  tasks,
  removeTodolist,
  changeTodolistTitle,
  createTask,
  removeTask,
  changeTaskTitle,
  changeTaskStatus,
}: {
  todolists: TodolistType[];
  tasks: TasksType;
  removeTodolist: (id: string) => void;
  changeTodolistTitle: (id: string, title: string) => void;

  createTask: ({
    todolistId,
    title,
  }: {
    todolistId: string;
    title: string;
  }) => void;
  removeTask: ({
    todolistId,
    taskId,
  }: {
    todolistId: string;
    taskId: string;
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
  changeTaskStatus: ({
    todolistId,
    taskId,
    isDone,
  }: {
    todolistId: string;
    taskId: string;
    isDone: boolean;
  }) => void;
}) => {
  return (
    <>
      {todolists?.map((tl) => {
        return (
          <Grid key={tl.id}>
            <Paper sx={{ p: "0 20px 20px 20px" }}>
              <TodolistItem
                key={tl.id}
                todolist={tl}
                tasks={tasks}
                removeTodolist={removeTodolist}
                changeTodolistTitle={changeTodolistTitle}
                createTask={createTask}
                removeTask={removeTask}
                changeTaskTitle={changeTaskTitle}
                changeTaskStatus={changeTaskStatus}
              />
            </Paper>
          </Grid>
        );
      })}
    </>
  );
};
