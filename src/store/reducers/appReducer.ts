import {AppStateType, RequestAppStatusType} from "@/app/types";

const initialState: AppStateType = {
  status: "idle",
  error: null
}

export const appReducer = (state: AppStateType = initialState, action: AppActionsType): AppStateType => {
  switch (action.type) {
    case "APP/SET-APP-STATUS": {
      const {status} = action.payload;
      return {...state, status}
    }
    case "APP/SET-APP-ERROR": {
      const {error} = action.payload;
      return {...state, error}
    }
    default:
      return state;
  }
};

//actions
export const setAppStatusAC = (status: RequestAppStatusType) => ({type: "APP/SET-APP-STATUS", payload: {status}}) as const;
export const setAppErrorAC = (error: string | null) => ({type: "APP/SET-APP-ERROR", payload: {error}}) as const;

//types
export type AppActionsType =
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppErrorAC>