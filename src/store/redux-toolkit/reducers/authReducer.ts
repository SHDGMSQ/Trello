import {InitialAuthStateType, LoginType, RejectedType} from "@/pages/Login/types";
import {api} from "@/api/api";
import {handleServerAppError, handleServerNetworkError} from "@/utils/errorUtils";
import {AxiosError} from "axios";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "@/store/redux-toolkit/types";
import {setAppStatusAC, setEmptyDataAC} from "@/store/redux-toolkit/reducers/appReducer";

const initialState: InitialAuthStateType = {
  isLoggedIn: false,
};
//thunks
export const loginTC = createAsyncThunk<InitialAuthStateType, LoginType, RejectedType>("auth/login", async (loginInfo, {dispatch, rejectWithValue}) => {
  dispatch(setAppStatusAC({status: "loading"}));
  try {
    const res = await api.authApi.login(loginInfo);
    if (res.data.resultCode === 0) {
      dispatch(setAppStatusAC({status: "succeeded"}));
      return {isLoggedIn: true};
    } else {
      handleServerAppError(dispatch, res.data);
      return rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
    }
  } catch (err) {
    const error: AxiosError = err;
    handleServerNetworkError(dispatch, err.message || "Network error");
    return rejectWithValue({errors: [error.message], fieldsErrors: []})
  }
})

export const logoutTC = createAsyncThunk("auth/logout", async (_, {dispatch, rejectWithValue}) => {
  dispatch(setAppStatusAC({status: "loading"}));
  try {
    const res = await api.authApi.logout();
    if (res.data.resultCode === 0) {
      dispatch(setAppStatusAC({status: "succeeded"}));
      return {isLoggedIn: false};
    } else {
      handleServerAppError(dispatch, res.data);
      return rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
    }
  } catch (err) {
    const error: AxiosError = err;
    handleServerNetworkError(dispatch, err.message || "Network error");
    return rejectWithValue({errors: [error.message], fieldsErrors: []})
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false
  },
  reducers: {
    setIsLoggedInAC: (state, action: PayloadAction<{isLoggedIn: boolean}>) => {
      const {isLoggedIn} = action.payload;
      state.isLoggedIn = isLoggedIn;
    },
    setLogOutAC: (state, action: PayloadAction<{isLoggedIn: boolean}>) => {
      const {isLoggedIn} = action.payload;
      state.isLoggedIn = isLoggedIn;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginTC.fulfilled, (state, action) => {
      const {isLoggedIn} = action.payload;
      state.isLoggedIn = isLoggedIn;
    });
    builder.addCase(logoutTC.fulfilled, (state, action) => {
      const {isLoggedIn} = action.payload;
      state.isLoggedIn = isLoggedIn;
    })
  }
})

export const authReducer = authSlice.reducer;

//actions
export const {setLogOutAC, setIsLoggedInAC} = authSlice.actions;