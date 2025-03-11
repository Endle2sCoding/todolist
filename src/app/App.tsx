import "./App.css";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { selectThemeMode } from "./app-selectors";
import { getTheme } from "@/common/theme";
import { Header } from "@/common/components/Header";
import { useAppDispatch, useAppSelector } from "@/common/hooks";
import { useEffect, useState } from "react";

import { fetchTodolistsThunk } from "@/features/Todolists/model/todolists-reducer";
import { DomainTask } from "@/features/Todolists/api/tasksApi.types";
import { ErrorSnackbar } from "@/common/components/ErrorSnackbar";
import { Path, Routing } from "@/common/routing/Routing";

import { useNavigate } from "react-router";
import { selectIsLoggedIn, setIsLoggedIn } from "@/features/auth/api/authSlice";
import { ResultCode } from "@/common/enums";

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValues;
};

export interface Task {
  id: string;
  title: string;
  isDone: boolean;
}

export type TasksState = Record<string, DomainTask[]>;

export type FilterValues = "all" | "active" | "completed";

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode);
  const theme = getTheme(themeMode);
  const [isInitialized, setIsInitialized] = useState(false);
  // onst { data, isLoading } = useMeQuery()
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  useEffect(() => {
    dispatch(fetchTodolistsThunk);
  }, [dispatch]);

  useEffect(() => {
    // if (!isLoading) {
    // setIsInitialized(true)
    // if (data?.resultCode === ResultCode.Success) {
    // dispatch(setIsLoggedIn({ isLoggedIn: true }))
    // }
    // }
    dispatch(setIsLoggedIn({ isLoggedIn: true }));
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Routing />
      <ErrorSnackbar />
    </ThemeProvider>
  );
};
