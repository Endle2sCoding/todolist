import { nanoid } from "@reduxjs/toolkit";
import { FilterValues, TodolistType } from "./types/todolist";

const initialState: TodolistType[] = [
  { id: "todolistId1", title: "What to learn", filter: "all" },
  { id: "todolistId2", title: "What to buy", filter: "all" },
];

export const removeTodolistAC = (id: string) => {
  return {
    type: "remove_todolist",
    payload: {
      id: id
    }
  } as const;
};

export const createTodolistAC = (title: string) => {
  return {
    type: "create_todolist",
    payload: {
      title: title
    }
  } as const;
};
export const changeTodolistTitleAC = ({ id, title }: { id: string, title: string; }) => {
  return {
    type: "change_todolist_title",
    payload: {
      title: title,
      id: id
    }
  } as const;
};
export const changeTodolistFilterAC = ({ id, filter }: { id: string, filter: FilterValues; }) => {
  return {
    type: "change_todolist_filter",
    payload: {
      filter: filter,
      id: id
    }
  } as const;
};

export type RemoveTodolistAction = ReturnType<typeof removeTodolistAC>;
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>;
type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>;
type ChangeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>;

type ActionsType = RemoveTodolistAction | CreateTodolistAction | ChangeTodolistTitleAction | ChangeTodolistFilterAction;

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
  switch (action.type) {
    case "remove_todolist":
      return state.filter(tl => tl.id !== action.payload.id);
    case "create_todolist":
      return [...state, { id: nanoid(), title: action.payload.title, filter: "all" }];
    case "change_todolist_title":
      return [...state.map(tl => tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl)];
    case "change_todolist_filter":
      return [...state.map(tl => tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl)];
    default:
      return state;
  }
};