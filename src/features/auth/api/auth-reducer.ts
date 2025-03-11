import { Dispatch } from "redux";
import { LoginArgs } from "./authApi.types";
import { setAppStatus } from "@/app/app-reducer";

type InitialStateType = typeof initialState;

const initialState = {
  isLoggedIn: false,
};

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "SET_IS_LOGGED_IN":
      return { ...state, isLoggedIn: action.payload.isLoggedIn };
    default:
      return state;
  }
};
// Action creators
export const setIsLoggedInAC = (isLoggedIn: boolean) => {
  return { type: "SET_IS_LOGGED_IN", payload: { isLoggedIn } } as const;
};

// Actions types
type ActionsType = ReturnType<typeof setIsLoggedInAC>;

// thunks
export const loginTC = (data: LoginArgs) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }));
};