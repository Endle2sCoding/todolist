import { MainPage } from "@/pages/MainPage/MainPage";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import "./styles/index.css";
import { Container, createTheme, ThemeProvider } from "@mui/material";
import { containerSx } from "@/widgets/Todolists/ui/TodolistItem.styles";
import { NavButton } from "@/shared/ui/NavButton/NavButton";
import Switch from "@mui/material/Switch";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";

type ThemeMode = "dark" | "light";

function App() {
  const [themeMode, setThemeMode] = useState<ThemeMode>("dark");
  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: "#087EA4",
      },
    },
  });

  const changeMode = () => {
    setThemeMode(themeMode === "light" ? "dark" : "light");
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="static"
        sx={{ mb: "30px" }}
      >
        <Toolbar>
          <Container
            maxWidth={"lg"}
            sx={containerSx}
          >
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
            <div>
              <NavButton color="inherit">Sign in</NavButton>
              <NavButton color="inherit">Sign up</NavButton>
              <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
              <Switch
                color={"default"}
                onChange={changeMode}
              />
            </div>
          </Container>
        </Toolbar>
      </AppBar>
      <MainPage />
    </ThemeProvider>
  );
}

export default App;
