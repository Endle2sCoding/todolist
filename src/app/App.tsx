import "./App.css";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { getTheme } from "@/shared/theme";
import { Header } from "@/widgets/Header";
import { useAppSelector } from "@/shared/hooks";

import { ErrorSnackbar } from "@/shared/ui/ErrorSnackbar";
import { Routing } from "@/app/providers/routing/Routing";
import { selectThemeMode } from "./model/app-slice";

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode);
  const theme = getTheme(themeMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Routing />
      <ErrorSnackbar />
    </ThemeProvider>
  );
};
