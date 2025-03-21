import s from "./Page404.module.css";
import { NavButton } from "../../common/components/NavButton";

export const Page404 = () => {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 94px)",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 className={s.title}>404</h1>
      <h2 className={s.subTitle}>page not found</h2>
      <NavButton href="/" variant="contained" sx={{ margin: "100px auto" }}>
        {`вернуться на главную`.toUpperCase()}
      </NavButton>
    </div>
  );
};
