import "./App.css";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { selectThemeMode } from "./app-selectors";
import { getTheme } from "@/common/theme";
import { Header } from "@/common/components/Header";
import { useAppSelector } from "@/common/hooks";

import { ErrorSnackbar } from "@/common/components/ErrorSnackbar";
import { Routing } from "@/common/routing/Routing";

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
