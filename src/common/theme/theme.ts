import { ThemeMode } from "@/app/providers/theme/app-reducer";
import { createTheme } from "@mui/material/styles";

export const getTheme = (themeMode: ThemeMode) => {
  return createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: "#087EA4",
      },
    },
  });
};
