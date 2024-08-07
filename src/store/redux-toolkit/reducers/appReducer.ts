import {AppStateType, RequestAppStatusType} from "@/app/types";
import {api} from "@/api/api";
import {handleServerNetworkError} from "@/utils/errorUtils";
import {AxiosError} from "axios";
import {createAction, createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {login} from "@/store/redux-toolkit/reducers/authReducer";

const initialState: AppStateType = {
  status: "idle",
  error: null,
  isInitialized: false,
};

//thunks
export const setIsInitializedApp = createAsyncThunk("app/setIsInitializedApp", async (_, {
  dispatch,
  rejectWithValue
}) => {
  try {
    const res = await api.authApi.me();
    if (res.data.resultCode === 0) {
      dispatch(login.fulfilled(undefined, "requestId", undefined));
    } else {
      //return rejectWithValue({error: "Some initialized error"});
    }
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
    setAppStatus: (state, action: PayloadAction<{ status: RequestAppStatusType }>) => {
      const {status} = action.payload;
      state.status = status;
    },
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      const {error} = action.payload;
      state.error = error;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setIsInitializedApp.fulfilled, (state) => {
      state.isInitialized = true;
    });
  }
});

export const clearData = createAction("app/clearData", (todolists, tasks) => {
  return {
    payload: {
      todolists,
      tasks,
    }
  }
});

export const appReducer = appSlice.reducer;

export const {setAppError, setAppStatus} = appSlice.actions;