import { createSlice } from "@reduxjs/toolkit";
import { Todolist } from "../../api/api";

export const todolistsSlice = createSlice({
  name: 'todolists',
  initialState: [] as Todolist[],
  reducers: create => ({
    createTodolistAC: create.reducer<{ id: string, title: string; }>((state, action) => {
      state.push({
        title: action.payload.title, id: action.payload.id,
        addedDate: "",
        order: 0
      });
    })
  }),
});
export const todolistsReducer = todolistsSlice.reducer;

export const { } = todolistsSlice.actions;