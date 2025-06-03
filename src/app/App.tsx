import { Todolist } from "@/widgets/Todolist";
import "./App.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
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
      <Todolist />;
    </>
  );
}

export default App;
