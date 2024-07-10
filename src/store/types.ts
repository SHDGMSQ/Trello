import {TasksActionsType} from "@/store/reducers/taskReducer";
import {TodolistActionsType} from "@/store/reducers/todolistReducer";
import {rootReducer} from "@/store/store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppActionsType} from "@/store/reducers/appReducer";
import {AuthActionsType} from "@/store/reducers/authReducer";

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppRootActionsType = TasksActionsType | TodolistActionsType | AppActionsType | AuthActionsType;
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppRootActionsType>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionsType>;