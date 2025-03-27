import { FilterValues, TodolistType } from "@/widgets/Todolists/model/types/todolist";

import { containerSx } from "@/shared/styles";

import { Box, Button } from "@mui/material";

type Props = {
  todolist: TodolistType;
};

export const FilterButtons = ({ todolist }: Props) => {
  const { filter } = todolist;

  const changeFilter = (filter: FilterValues) => {};

  return (
    <Box sx={containerSx}>
      <Button variant={filter === "all" ? "outlined" : "text"} color={"inherit"} onClick={() => changeFilter("all")}>
        All
      </Button>
      <Button
        variant={filter === "active" ? "outlined" : "text"}
        color={"primary"}
        onClick={() => changeFilter("active")}
      >
        Active
      </Button>
      <Button
        variant={filter === "completed" ? "outlined" : "text"}
        color={"secondary"}
        onClick={() => changeFilter("completed")}
      >
        Completed
      </Button>
    </Box>
  );
};
