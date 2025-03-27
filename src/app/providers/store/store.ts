import { tasksReducer } from "../../../widgets/Todolists/model/slices/tasks-reducer";
// import { todolistsReducer } from "../features/Todolists/model/todolists-reducer";

import { todolistsReducer } from "@/widgets/Todolists/model/slices/todolists-reducer";
import { appReducer, appSlice } from "@/app/model/app-slice";
import { configureStore } from "@reduxjs/toolkit";




export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    todolists: todolistsReducer,
    [appSlice.name]: appReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// для возможности обращения к store в консоли браузера
// eslint-disable-next-line
// @ts-ignore
// window.store = store;
window.store = store;
