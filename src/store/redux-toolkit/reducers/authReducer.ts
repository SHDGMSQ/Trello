import {InitialAuthStateType, LoginType, RejectedLoginType} from "@/pages/Login/types";
import {api} from "@/api/api";
import {handleServerAppError, handleServerNetworkError} from "@/utils/errorUtils";
import {AxiosError} from "axios";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "@/store/redux-toolkit/types";
import {setAppStatusAC, setEmptyDataAC} from "@/store/redux-toolkit/reducers/appReducer";

const initialState: InitialAuthStateType = {
  isLoggedIn: false,
};

export const loginTC = createAsyncThunk<InitialAuthStateType, LoginType, RejectedLoginType>("auth/login", async (loginInfo, thunkAPI) => {
  thunkAPI.dispatch(setAppStatusAC({status: "loading"}));
  try {
    const res = await api.authApi.login(loginInfo)
    if (res.data.resultCode === 0) {
      thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}));
      return {isLoggedIn: true};
    } else {
      handleServerAppError(thunkAPI.dispatch, res.data);
      return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
    }
  } catch (err) {
    const error: AxiosError = err;
    handleServerNetworkError(thunkAPI.dispatch, err.message || "Network error");
    return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: []})
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
    })
  }
})

export const authReducer = authSlice.reducer;

//actions
export const {setLogOutAC, setIsLoggedInAC} = authSlice.actions;

//thunks
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