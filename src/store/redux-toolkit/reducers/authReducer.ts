import {InitialAuthStateType, LoginType} from "@/pages/Login/types";
import {api} from "@/api/api";
import {handleServerAppError, handleServerNetworkError} from "@/utils/errorUtils";
import {AxiosError} from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "@/store/redux-toolkit/types";
import {setAppStatusAC, setEmptyDataAC} from "@/store/redux-toolkit/reducers/appReducer";

const initialState: InitialAuthStateType = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedInAC: (state, action: PayloadAction<{isLoggedIn: boolean}>) => {
      const {isLoggedIn} = action.payload;
      state.isLoggedIn = isLoggedIn;
    },
    setLogOutAC: (state, action: PayloadAction<{isLoggedIn: boolean}>) => {
      const {isLoggedIn} = action.payload;
      state.isLoggedIn = isLoggedIn;
    }
  }
})

export const authReducer = authSlice.reducer;

//actions
export const {setLogOutAC, setIsLoggedInAC} = authSlice.actions;

//thunks
export const loginTC = (loginInfo: LoginType): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC({status: "loading"}));
  api.authApi.login(loginInfo)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({isLoggedIn: true}));
        dispatch(setAppStatusAC({status: "succeeded"}));
      } else {
        handleServerAppError(dispatch, res.data);
      }
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(dispatch, err.message || "Network error");
    });
};
export const logoutTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC({status: "loading"}));
  api.authApi.logout()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setLogOutAC({isLoggedIn: false}));
        dispatch(setEmptyDataAC());
        dispatch(setAppStatusAC({status: "succeeded"}));
      } else {
        handleServerAppError(dispatch, res.data);
      }
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(dispatch, err.message || "Network error")
    })
};

//types
// export type AuthActionsType =
//   | ReturnType<typeof setIsLoggedInAC>
//   | ReturnType<typeof setLogOutAC>