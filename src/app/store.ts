import { configureStore } from "@reduxjs/toolkit";
import { tasksReducer, tasksSlice } from "../features/Todolists/model/tasks-reducer";
import { todolistsReducer, todolistsSlice } from "../features/Todolists/model/todolists-reducer";
import { appReducer, appSlice } from "./app-reducer";
import { authReducer, authSlice } from "@/features/auth/lib/slices/authSlice";
import { todolistsApi } from "@/features/Todolists/api/todolistsApi";
import { setupListeners } from "@reduxjs/toolkit/query";


// создание store
export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksReducer,
    [todolistsSlice.name]: todolistsReducer,
    [appSlice.name]: appReducer,
    [authSlice.name]: authReducer,
    [todolistsApi.reducerPath]: todolistsApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(todolistsApi.middleware),
});
// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>;
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch;

// для возможности обращения к store в консоли браузера
// eslint-disable-next-line
// @ts-ignore
// window.store = store;
setupListeners(store.dispatch);
