import {AppStateType, RequestAppStatusType} from "@/app/types";
import {api} from "@/api/api";
import {handleServerNetworkError} from "@/utils/errorUtils";
import {AxiosError} from "axios";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setIsLoggedInAC} from "@/store/redux-toolkit/reducers/authReducer";

const initialState: AppStateType = {
  status: "idle",
  error: null,
  isInitialized: false,
};

//thunks
export const setIsInitializedAppTC = createAsyncThunk("app/setIsInitializedApp", async (_, {
  dispatch,
  rejectWithValue
}) => {
  try {
    const res = await api.authApi.me();
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC({isLoggedIn: true}));
    }
    return true;
  } catch (err) {
    const error: AxiosError = err;
    handleServerNetworkError(dispatch, err.message || "Network error");
    return rejectWithValue({errors: [error.message], fieldsErrors: []});
  }

});

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppStatusAC: (state, action: PayloadAction<{ status: RequestAppStatusType }>) => {
      const {status} = action.payload;
      state.status = status;
    },
    setAppErrorAC: (state, action: PayloadAction<{ error: string | null }>) => {
      const {error} = action.payload;
      state.error = error;
    },
    setAppIsInitializedAC: (state) => {
      state.isInitialized = true;
    },
    setEmptyDataAC: () => {
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setIsInitializedAppTC.fulfilled, (state) => {
      state.isInitialized = true;
    });
  }
});

export const appReducer = appSlice.reducer;

export const {setAppIsInitializedAC, setAppErrorAC, setAppStatusAC, setEmptyDataAC} = appSlice.actions;