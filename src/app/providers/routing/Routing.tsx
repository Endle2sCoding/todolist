import { MainPage } from "@/pages/MainPage";

import { Route, Routes } from "react-router";
import { Page404 } from "../../../pages/Page404/Page404";
// import { Login } from "@/features/auth/ui/Login/Login";
export const Path = {
  Main: "/",
  Login: "login",
  Signup: "signup",
  NotFound: "*",
} as const;

export const Routing = () => {
  return (
    <Routes>
      <Route path={Path.Main} element={<MainPage />} />

      <Route path={Path.NotFound} element={<Page404 />} />
    </Routes>
  );
};
