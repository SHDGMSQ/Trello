import {combineReducers, createStore} from "redux";
import {todolistReducer} from "@/store/reducers/todolistReducer";
import {taskReducer} from "@/store/reducers/taskReducer";

const rootReducer = combineReducers({
  todolists: todolistReducer,
  tasks: taskReducer,
}
);
export const store = createStore(rootReducer);

//types
export type AppRootStateType = ReturnType<typeof rootReducer>