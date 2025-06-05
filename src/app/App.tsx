import { Todolist } from "@/widgets/Todolist";
import "./App.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import { NavButton } from "@/shared/ui/NavButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";

type ThemeMode = "dark" | "light";

function App() {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");
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
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
            <div>
              <NavButton>Sign in</NavButton>
              <NavButton>Sign up</NavButton>
              <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
              <Switch
                color={"default"}
                onChange={changeMode}
              />
            </div>
          </Container>
        </Toolbar>
      </AppBar>
      <Todolist />;
    </ThemeProvider>
  );
}

export default App;
