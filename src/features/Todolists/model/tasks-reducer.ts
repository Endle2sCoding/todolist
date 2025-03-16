import { nanoid } from "@reduxjs/toolkit";
import { CreateTodolistAction, RemoveTodolistAction } from "./todolists-reducer";
import { TasksType } from "./types/todolist";


const initialState: TasksType = {};

export const createTodolistAC = (id: string) => {
  return {
    type: "create_todolist",
    payload: {
      id: id
    }
  } as const;
};
export const removeTodolistAC = (id: string) => {
  return {
    type: "remove_todolist",
    payload: {
      id: id
    }
  } as const;
};

type Actions = CreateTodolistAction | RemoveTodolistAction;
export const tasksReducer = (state: TasksType = initialState, action: Actions): TasksType => {
  switch (action.type) {
    case 'create_todolist': {
      return { ...state, [nanoid()]: [] };
    }
    case 'remove_todolist': {
      delete state[action.payload.id];
      return { ...state };
    }
    default:
      return state;
  }
};
