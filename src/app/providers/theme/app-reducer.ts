import { createAction, createReducer } from "@reduxjs/toolkit";

export type ThemeMode = "dark" | "light";

export const changeThemeModeAC = createAction<{ themeMode: ThemeMode }>("app/changeThemeMode");
export const setAppError = createAction<{ error: string | null }>("app/setAppError");

type StateType = {
  themeMode: ThemeMode;
  error: string | null;
};
const initialState: StateType = {
  themeMode: "dark" as ThemeMode,
  error: null,
};

export const appReducer = createReducer(initialState, (builder) => {
  builder.addCase(changeThemeModeAC, (state, action) => {
    state.themeMode = action.payload.themeMode;
  });
  builder.addCase(setAppError, (state, action) => {
    state.error = action.payload.error;
  });
});
