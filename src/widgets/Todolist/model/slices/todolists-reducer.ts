import { v1 } from "uuid";
import type { FilterType, TodolistType } from "../types/todolist";

const initialState: TodolistType[] = [];

export const deleteTodolistAC = (id: string) => {
  return { type: 'delete_todolist', payload: { id } } as const;
};
export const createTodolistAC = (title: string) => {
  return { type: 'create_todolist', payload: { id: v1(), title } } as const;
};

export const changeTodolistTitleAC = ({ id, title }: { id: string, title: string; }) => {
  return { type: "change_todolist_title", payload: { id, title } } as const;
};
export const changeTodolistFilterAC = ({ id, filter }: { id: string, filter: FilterType; }) => {
  return { type: "change_todolist_filter", payload: { id, filter } } as const;
};


export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>;
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>;
export type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>;
export type ChangeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>;

type Actions = DeleteTodolistAction | CreateTodolistAction | ChangeTodolistTitleAction | ChangeTodolistFilterAction;

export const todolistsReducer = (state: TodolistType[] = initialState, action: Actions): TodolistType[] => {
  switch (action.type) {
    case "delete_todolist":
      return state.filter(tl => tl.id !== action.payload.id);
    case "create_todolist":
      return [...state, { id: action.payload.id, title: action.payload.title, filter: "all" }];
    case "change_todolist_title":
      return [...state.map(tl => tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl)];
    case "change_todolist_filter":
      return [...state.map(tl => tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl)];
    default:
      return state;
  }

};