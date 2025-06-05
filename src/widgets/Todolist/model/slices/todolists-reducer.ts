import type { TodolistType } from "../types/todolist";

const initialState: TodolistType[] = [];

export const deleteTodolistAC = (id: string) => {
  return { type: 'delete_todolist', payload: { id } } as const;
};

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>;

type Actions = DeleteTodolistAction;

export const todolistsReducer = (state: TodolistType[] = initialState, action: Actions): TodolistType[] => {
  switch (action.type) {
    case "delete_todolist":
      return state.filter(tl => tl.id !== action.payload.id);
    default:
      return state;
  }

};