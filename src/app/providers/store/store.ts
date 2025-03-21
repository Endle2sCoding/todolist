import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { tasksReducer } from "../../../features/Todolists/model/slices/tasks-reducer";
// import { todolistsReducer } from "../features/Todolists/model/todolists-reducer";
import { appReducer } from "../theme/app-reducer";
import { setupListeners } from "@reduxjs/toolkit/query";
import { todolistsReducer } from "@/features/Todolists/model/slices/todolists-reducer";

// создание store

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
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
