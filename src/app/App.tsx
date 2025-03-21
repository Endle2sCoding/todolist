import "./App.css";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { selectThemeMode } from "./providers/theme/app-selectors";
import { getTheme } from "@/common/theme";
import { Header } from "@/widgets/Header";
import { useAppSelector } from "@/common/hooks";

import { ErrorSnackbar } from "@/common/components/ErrorSnackbar";
import { Routing } from "@/app/providers/routing/Routing";

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
