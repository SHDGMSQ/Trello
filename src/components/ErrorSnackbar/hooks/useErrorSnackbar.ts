import {useAppDispatch, useAppSelector} from "@/store/hooks/hooks";
import {setAppErrorAC} from "@/store/reducers/appReducer";

export const useErrorSnackbar = () => {
  const error = useAppSelector(state => state.app.error);
  const dispatch = useAppDispatch();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setAppErrorAC(null));
  };

  return {
    error,
    handleClose
  };
};