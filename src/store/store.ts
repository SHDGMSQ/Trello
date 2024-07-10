import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistReducer} from "@/store/reducers/todolistReducer";
import {taskReducer} from "@/store/reducers/taskReducer";
import {thunk} from "redux-thunk";
import {appReducer} from "@/store/reducers/appReducer";
import {authReducer} from "@/store/reducers/authReducer";

export const rootReducer = combineReducers({
  todolists: todolistReducer,
  tasks: taskReducer,
  app: appReducer,
  auth: authReducer,
}
);
export const store = createStore(rootReducer, applyMiddleware(thunk));