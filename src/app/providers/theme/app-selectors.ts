import { ThemeMode } from "./app-reducer";
import { RootState } from "../store/store";

export const selectThemeMode = (state: RootState): ThemeMode => state.app.themeMode;

export const selectAppError = (state: RootState) => state.app.error;
