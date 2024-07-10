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
    default:
      return state;
  }
};

//actions
export const setAppStatusAC = (status: RequestAppStatusType) => ({type: "APP/SET-APP-STATUS", payload: {status}}) as const;

//types
export type AppActionsType =
  | ReturnType<typeof setAppStatusAC>