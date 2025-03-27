// import { SyntheticEvent } from "react";
// import Alert from "@mui/material/Alert";
// import Snackbar from "@mui/material/Snackbar";
// import { useAppDispatch, useAppSelector } from "@/shared/hooks";
// import { selectAppError } from "@/app/model/theme/app-selectors";
// import { setAppError } from "@/app/model/theme/app-reducer";

// export const ErrorSnackbar = () => {
//   const dispatch = useAppDispatch();
//   const error = useAppSelector(selectAppError);
//   // const [open, setOpen] = useState(true)

//   const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
//     console.log(event);

//     if (reason === "clickaway") {
//       return dispatch(setAppError({ error: null }));
//     }
//     setTimeout(() => dispatch(setAppError({ error: null }), 2000));
//   };
//   return (
//     <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
//       <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: "100%" }}>
//         {error && error}
//       </Alert>
//     </Snackbar>
//   );
// };
export const ErrorSnackbar = () => {
  return null;
};
