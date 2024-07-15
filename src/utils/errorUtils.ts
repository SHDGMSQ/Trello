import {Dispatch} from "redux";
import {ResponseType} from "@/api/types";
import {setAppError, setAppStatus} from "@/store/redux-toolkit/reducers/appReducer";

export const handleServerAppError = <D>(dispatch: Dispatch, data: ResponseType<D>) => {
  if (data.messages.length) {
    dispatch(setAppError({error: data.messages[0]}));
  } else {
    dispatch(setAppError({error: "Something went wrong!"}));
  }
  dispatch(setAppStatus({status: "failed"}));
};

export const handleServerNetworkError = (dispatch: Dispatch, message: string) => {
  dispatch(setAppError({error: message}));
  dispatch(setAppStatus({status: "failed"}));
};