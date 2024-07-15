import {InitialAuthStateType, LoginType, RejectedType} from "@/pages/Login/types";
import {api} from "@/api/api";
import {handleServerAppError, handleServerNetworkError} from "@/utils/errorUtils";
import {AxiosError} from "axios";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearData, setAppStatus} from "@/store/redux-toolkit/reducers/appReducer";

const initialState: InitialAuthStateType = {
  isLoggedIn: false,
};
//thunks
export const login = createAsyncThunk<undefined, LoginType, RejectedType>("auth/login", async (loginInfo, {dispatch, rejectWithValue}) => {
  dispatch(setAppStatus({status: "loading"}));
  try {
    const res = await api.authApi.login(loginInfo);
    if (res.data.resultCode === 0) {
      dispatch(setAppStatus({status: "succeeded"}));
      return;
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

export const logout = createAsyncThunk("auth/logout", async (_, {dispatch, rejectWithValue}) => {
  dispatch(setAppStatus({status: "loading"}));
  try {
    const res = await api.authApi.logout();
    if (res.data.resultCode === 0) {
      dispatch(setAppStatus({status: "succeeded"}));
      dispatch(clearData([], {}));
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state) => {
      state.isLoggedIn = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoggedIn = false;
    })
  }
})

export const authReducer = authSlice.reducer;