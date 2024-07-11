import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistReducer} from "@/store/redux/reducers/todolistReducer";
import {taskReducer} from "@/store/redux/reducers/taskReducer";
import {thunk} from "redux-thunk";
import {appReducer} from "@/store/redux/reducers/appReducer";
import {authReducer} from "@/store/redux/reducers/authReducer";

export const rootReducer = combineReducers({
  todolists: todolistReducer,
  tasks: taskReducer,
  app: appReducer,
  auth: authReducer,
}
);
export const store = createStore(rootReducer, applyMiddleware(thunk));