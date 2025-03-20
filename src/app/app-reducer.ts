import { createAction, createReducer } from "@reduxjs/toolkit";

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';
export type ThemeMode = "dark" | "light";

export const changeThemeModeAC = createAction<{ themeMode: ThemeMode; }>("app/changeThemeMode");
export const setAppError = createAction<{ error: string | null; }>("app/setAppError");

const initialState = {
  themeMode: 'light' as ThemeMode,
  error: null
};

export const appReducer = createReducer(initialState, builder => {
  builder
    .addCase(changeThemeModeAC, (state, action) => {
      state.themeMode = action.payload.themeMode;

    });
});
// export const appSlice = createSlice({
//   name: 'app',
//   initialState: {
//     themeMode: 'light' as ThemeMode,
//     status: 'idle' as RequestStatus,
//     error: null as string | null,
//   },
//   reducers: create => ({
//     changeTheme: create.reducer<{ themeMode: ThemeMode; }>((state, action) => {
//       state.themeMode = action.payload.themeMode;
//     }),
//     setAppStatus: create.reducer<{ status: RequestStatus; }>((state, action) => {
//       state.status = action.payload.status;
//     }),
//     setAppError: create.reducer<{ error: string | null; }>((state, action) => {
//       state.error = action.payload.error;
//     }),
//   }),
// });

// export const { changeTheme, setAppError, setAppStatus } = appSlice.actions;
// export const appReducer = appSlice.reducer;