import {TasksActionsType} from "@/store/redux/reducers/taskReducer";
import {TodolistActionsType} from "@/store/redux/reducers/todolistReducer";
import {rootReducer} from "@/store/redux/store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppActionsType} from "@/store/redux/reducers/appReducer";
import {AuthActionsType} from "@/store/redux/reducers/authReducer";

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppRootActionsType = TasksActionsType | TodolistActionsType | AppActionsType | AuthActionsType;
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppRootActionsType>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionsType>;