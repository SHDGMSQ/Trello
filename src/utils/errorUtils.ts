import {Dispatch} from "redux";
import {ResponseType} from "@/api/types";
import {setAppErrorAC, setAppStatusAC} from "@/store/redux-toolkit/reducers/appReducer";

export const handleServerAppError = <D>(dispatch: Dispatch, data: ResponseType<D>) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC({error: data.messages[0]}));
  } else {
    dispatch(setAppErrorAC({error: "Something went wrong!"}));
  }
  dispatch(setAppStatusAC({status: "failed"}));
};

export const handleServerNetworkError = (dispatch: Dispatch, message: string) => {
  dispatch(setAppErrorAC({error: message}));
  dispatch(setAppStatusAC({status: "failed"}));
};