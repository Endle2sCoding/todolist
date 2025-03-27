import { Dispatch } from "redux";
import { setAppError } from "@/app/model/theme/app-reducer";

export const handleServerNetworkError = (error: { message: string; }, dispatch: Dispatch) => {
  dispatch(setAppError({ error: error.message }));
  // dispatch(setAppStatus({ status: "failed" }));
};
