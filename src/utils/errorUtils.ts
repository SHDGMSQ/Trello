import {AppRootActionsType} from "@/store/types";
import {setAppErrorAC, setAppStatusAC} from "@/store/reducers/appReducer";
import {Dispatch} from "redux";
import {ResponseType} from "@/api/types";

export const handleServerAppError = <D>(dispatch: Dispatch<AppRootActionsType>, data: ResponseType<D>) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[0]));
  } else {
    dispatch(setAppErrorAC("Something went wrong!"));
  }
  dispatch(setAppStatusAC("failed"));
};

export const handleServerNetworkError = (dispatch: Dispatch<AppRootActionsType>, message: string) => {
  dispatch(setAppErrorAC(message));
  dispatch(setAppStatusAC("failed"));
};