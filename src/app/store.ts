import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { tasksReducer } from "../features/Todolists/model/tasks-reducer";
// import { todolistsReducer } from "../features/Todolists/model/todolists-reducer";
import { appReducer, appSlice } from "./app-reducer";
import { authReducer, authSlice } from "@/features/auth/api/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "./baseApi";
import { todolistsReducer } from "@/features/Todolists/model/todolists-reducer";


// создание store


const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  [appSlice.name]: appReducer,
  [authSlice.name]: authReducer,
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer
});

// создание store
export const store = configureStore({
  reducer: rootReducer,
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
