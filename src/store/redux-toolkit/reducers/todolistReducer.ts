import {FilterValuesType, TodolistType} from "@/components/Todolist/types";
import {api} from "@/api/api";
import {TodolistResponseType} from "@/api/types";
import {RequestAppStatusType} from "@/app/types";
import {handleServerAppError, handleServerNetworkError} from "@/utils/errorUtils";
import {AxiosError} from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "@/store/redux-toolkit/types";
import {setAppErrorAC, setAppStatusAC, setEmptyDataAC} from "@/store/redux-toolkit/reducers/appReducer";
import {fetchTasksTC} from "@/store/redux-toolkit/reducers/taskReducer";
import {Draft} from "immer";

const initialState: Array<TodolistType> = [];

const todolistsSlice = createSlice({
  name: "todolists",
  initialState,
  reducers: {
    setTodolistsAC: (state: Draft<Array<TodolistType>>, action: PayloadAction<{ todolists: Array<TodolistResponseType> }>) => {
      const {todolists} = action.payload;
      state.length = 0;
      todolists.forEach(tl => state.push({...tl, filter: "All", entityStatus: "idle"}));
    },
    removeTodolistAC: (state: Draft<Array<TodolistType>>, action: PayloadAction<{ todoId: string }>) => {
      const {todoId} = action.payload;
      const index = state.findIndex(state => state.id === todoId);
      if (index > -1) {
        state.splice(index, 1);
      }
    },
    addTodolistAC: (state: Draft<Array<TodolistType>>, action: PayloadAction<{ todolist: TodolistResponseType }>) => {
      const {todolist} = action.payload;
      state.unshift({...todolist, filter: "All", entityStatus: "idle"});
    },
    changeFilterAC: (state: Draft<Array<TodolistType>>, action: PayloadAction<{ todoId: string, value: FilterValuesType }>) => {
      const {todoId, value} = action.payload;
      const index = state.findIndex(el => el.id === todoId);
      state[index].filter = value;
    },
    changeTodolistTitleAC: (state: Draft<Array<TodolistType>>, action: PayloadAction<{ todoId: string, title: string }>) => {
      const {todoId, title} = action.payload;
      const index = state.findIndex(el => el.id === todoId);
      state[index].title = title;
    },
    changeTodolistEntityStatusAC: (state: Draft<Array<TodolistType>>, action: PayloadAction<{ todoId: string, entityStatus: RequestAppStatusType }>) => {
      const {todoId, entityStatus} = action.payload;
      const index = state.findIndex(el => el.id === todoId);
      state[index].entityStatus = entityStatus;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setEmptyDataAC.type, () => {
      return [];
    });
  }
});

export const todolistsReducer = todolistsSlice.reducer;

//actions
export const {
  changeTodolistTitleAC,
  removeTodolistAC,
  setTodolistsAC,
  changeTodolistEntityStatusAC,
  changeFilterAC,
  addTodolistAC,
} = todolistsSlice.actions;

//thunks
export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC({status: "loading"}));
  api.todolistsApi.getTodolists()
    .then((res) => {
      if (res.status === 200) {
        dispatch(setTodolistsAC({todolists: res.data}));
        dispatch(setAppStatusAC({status: "succeeded"}));
        return res.data;
      } else {
        dispatch(setAppErrorAC({error: "Something went wrong when todos fetching!"}));
        dispatch(setAppStatusAC({status: "failed"}));
      }
    })
    .then((todos) => {
      todos.forEach((tl) => {
        dispatch(fetchTasksTC(tl.id));
      });
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(dispatch, err.message || "Network error");
    });
};
export const removeTodolistTC = (todoId: string): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC({status: "loading"}));
  dispatch(changeTodolistEntityStatusAC({todoId, entityStatus: "loading"}));
  api.todolistsApi.removeTodolist(todoId)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(removeTodolistAC({todoId}));
        dispatch(setAppStatusAC({status: "succeeded"}));
        dispatch(changeTodolistEntityStatusAC({todoId, entityStatus: "idle"}));
      } else {
        handleServerAppError(dispatch, res.data);
      }
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(dispatch, err.message || "Network error");
    });
};
export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC({status: "loading"}));
  api.todolistsApi.createTodolist(title)
    .then((res) => {
      if (res.data.resultCode === 0) {
        const {item} = res.data.data;
        dispatch(addTodolistAC({todolist: item}));
        dispatch(setAppStatusAC({status: "succeeded"}));
      } else {
        handleServerAppError(dispatch, res.data);
      }
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(dispatch, err.message || "Network error");
    });
};
export const changeTodolistTitleTC = (todoId: string, title: string): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC({status: "loading"}));
  api.todolistsApi.updateTodolist(todoId, title)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(changeTodolistTitleAC({todoId, title}));
        dispatch(setAppStatusAC({status: "succeeded"}));
      } else {
        handleServerAppError(dispatch, res.data);
      }
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(dispatch, err.message || "Network error");
    });
};