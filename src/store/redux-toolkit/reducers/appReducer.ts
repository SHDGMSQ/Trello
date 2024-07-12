import {AppStateType, RequestAppStatusType} from "@/app/types";
import {api} from "@/api/api";
import {handleServerNetworkError} from "@/utils/errorUtils";
import {AxiosError} from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "@/store/redux-toolkit/types";
import {setIsLoggedInAC} from "@/store/redux-toolkit/reducers/authReducer";

const initialState: AppStateType = {
  status: "idle",
  error: null,
  isInitialized: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppStatusAC: (state, action: PayloadAction<{status: RequestAppStatusType}>) => {
      const {status} = action.payload;
      state.status = status;
    },
    setAppErrorAC: (state, action: PayloadAction<{error: string | null}>) => {
      const {error} = action.payload;
      state.error = error;
    },
    setAppIsInitializedAC: (state, action: PayloadAction<{isInitialized: boolean}>) => {
      const {isInitialized} = action.payload;
      state.isInitialized = isInitialized;
    },
    setEmptyDataAC: () => {}
  }
})

export const appReducer = appSlice.reducer;

export const {setAppIsInitializedAC, setAppErrorAC, setAppStatusAC, setEmptyDataAC} = appSlice.actions;

//thunks
export const setIsInitializedAppTC = (): AppThunk => (dispatch) => {
  api.authApi.me()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({isLoggedIn: true}));
      }
      dispatch(setAppIsInitializedAC({isInitialized: true}));
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(dispatch, err.message || "Network error");
    });
};

//types
// export type AppActionsType =
//   | ReturnType<typeof setAppStatusAC>
//   | ReturnType<typeof setAppErrorAC>
//   | ReturnType<typeof setAppIsInitializedAC>