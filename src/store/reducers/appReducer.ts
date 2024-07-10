import {AppStateType, RequestAppStatusType} from "@/app/types";
import {AppThunk} from "@/store/types";
import {api} from "@/api/api";
import {setIsLoggedInAC} from "@/store/reducers/authReducer";
import {handleServerAppError, handleServerNetworkError} from "@/utils/errorUtils";
import {AxiosError} from "axios";

const initialState: AppStateType = {
  status: "idle",
  error: null,
  isInitialized: false,
};

export const appReducer = (state: AppStateType = initialState, action: AppActionsType): AppStateType => {
  switch (action.type) {
    case "APP/SET-APP-STATUS": {
      const {status} = action.payload;
      return {...state, status};
    }
    case "APP/SET-APP-ERROR": {
      const {error} = action.payload;
      return {...state, error};
    }
    case "APP/SET-APP-IS-INITIALIZED": {
      const {isInitialized} = action.payload;
      return {...state, isInitialized};
    }
    default:
      return state;
  }
};

//actions
export const setAppStatusAC = (status: RequestAppStatusType) => ({
  type: "APP/SET-APP-STATUS",
  payload: {status}
}) as const;
export const setAppErrorAC = (error: string | null) => ({type: "APP/SET-APP-ERROR", payload: {error}}) as const;
export const setAppIsInitializedAC = (isInitialized: boolean) => ({
  type: "APP/SET-APP-IS-INITIALIZED",
  payload: {isInitialized}
}) as const;

//thunks
export const setIsInitializedAppTC = (): AppThunk => (dispatch) => {
  api.authApi.me()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(true));
      }
      dispatch(setAppIsInitializedAC(true));
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(dispatch, err.message || "Network error");
    });
};

//types
export type AppActionsType =
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof setAppIsInitializedAC>