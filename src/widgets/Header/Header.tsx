import { useAppDispatch } from "@/shared/hooks";
import { useAppSelector } from "@/shared/hooks";
import { getTheme } from "@/shared/theme";
import { AppBar, Container, IconButton, LinearProgress, Switch, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavButton } from "@/shared/ui";
import { containerSx } from "@/shared/styles";
import { changeThemeModeAC, selectThemeMode, ThemeMode } from "@/app/model/app-slice";

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode);

  const dispatch = useAppDispatch();

  const theme = getTheme(themeMode);

  const changeMode = () => {
    dispatch(
      changeThemeModeAC({
        themeMode: themeMode === ("light" as ThemeMode) ? ("dark" as ThemeMode) : ("light" as ThemeMode),
      }),
    );
  };

  return (
    <AppBar position="static" sx={{ mb: "30px" }}>
      <Toolbar>
        <Container maxWidth={"lg"} sx={containerSx}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div>
            <NavButton href="/login" color="inherit">
              Login
            </NavButton>
            <NavButton color="inherit" href="/signup">
              Sign up
            </NavButton>
            <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
            <Switch color={"default"} onChange={changeMode} />
          </div>
        </Container>
      </Toolbar>
      {status === "loading" && <LinearProgress />}
    </AppBar>
  );
};
