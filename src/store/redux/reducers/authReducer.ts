import {InitialAuthStateType, LoginType} from "@/pages/Login/types";
import {AppThunk} from "@/store/redux/types";
import {setAppStatusAC} from "@/store/redux/reducers/appReducer";
import {api} from "@/api/api";
import {handleServerAppError, handleServerNetworkError} from "@/utils/errorUtils";
import {AxiosError} from "axios";

const initialState: InitialAuthStateType = {
  isLoggedIn: false,
};

export const authReducer = (state: InitialAuthStateType = initialState, action: AuthActionsType): InitialAuthStateType => {
  switch (action.type) {
    case "AUTH/SET-IS-LOGGED-IN" : {
      const {isLoggedIn} = action.payload;
      return {...state, isLoggedIn};
    }
    case "AUTH/SET-LOGOUT": {
      const {isLoggedIn} = action.payload;
      return {...state, isLoggedIn};
    }
    default:
      return state;
  }
};

//actions
export const setIsLoggedInAC = (isLoggedIn: boolean) => ({
  type: "AUTH/SET-IS-LOGGED-IN",
  payload: {isLoggedIn}
}) as const;
export const setLogOutAC = (isLoggedIn: boolean) => ({type: "AUTH/SET-LOGOUT", payload: {isLoggedIn}}) as const;

//thunks
export const loginTC = (loginInfo: LoginType): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC("loading"));
  api.authApi.login(loginInfo)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(true));
        dispatch(setAppStatusAC("succeeded"));
      } else {
        handleServerAppError(dispatch, res.data);
      }
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(dispatch, err.message || "Network error");
    });
};
export const logoutTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC("loading"));
  api.authApi.logout()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setLogOutAC(false));
        dispatch(setAppStatusAC("succeeded"));
      } else {
        handleServerAppError(dispatch, res.data);
      }
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(dispatch, err.message || "Network error")
    })
};

//types
export type AuthActionsType =
  | ReturnType<typeof setIsLoggedInAC>
  | ReturnType<typeof setLogOutAC>