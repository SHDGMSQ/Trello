import {useAppDispatch, useAppSelector} from "@/store/redux-toolkit/hooks/hooks";
import React from "react";
import {setAppErrorAC} from "@/store/redux-toolkit/reducers/appReducer";

export const useErrorSnackbar = () => {
  const error = useAppSelector(state => state.app.error);
  const dispatch = useAppDispatch();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setAppErrorAC({error: null}));
  };

  return {
    error,
    handleClose
  };
};