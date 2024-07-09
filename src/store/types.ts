import {TasksActionsType} from "@/store/reducers/taskReducer";
import {TodolistActionsType} from "@/store/reducers/todolistReducer";
import {rootReducer} from "@/store/store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppActionsType = TasksActionsType | TodolistActionsType;
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>;