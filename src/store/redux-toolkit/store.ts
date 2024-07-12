import {configureStore} from "@reduxjs/toolkit";
import {appReducer} from "@/store/redux-toolkit/reducers/appReducer";
import {authReducer} from "@/store/redux-toolkit/reducers/authReducer";
import {todolistsReducer} from "@/store/redux-toolkit/reducers/todolistReducer";
import {tasksReducer} from "@/store/redux-toolkit/reducers/taskReducer";


export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    todolists: todolistsReducer,
    tasks: tasksReducer,
  },
});

//@ts-ignore
window.store = store;

