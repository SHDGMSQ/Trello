import {setAppErrorAC} from "@/store/redux/reducers/appReducer";
import {useAppDispatch, useAppSelector} from "@/store/redux-toolkit/hooks/hooks";
import React from "react";

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