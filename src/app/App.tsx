import { MainPage } from "@/pages/MainPage/MainPage";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import "./styles/index.css";
import { Container } from "@mui/material";

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Container maxWidth={"lg"}>
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
            <Button color="inherit">Sign in</Button>
          </Container>
        </Toolbar>
      </AppBar>
      <MainPage />
    </>
  );
}

export default App;
