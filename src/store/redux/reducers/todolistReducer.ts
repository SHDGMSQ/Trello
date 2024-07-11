import {FilterValuesType, TodolistType} from "@/components/Todolist/types";
import {api} from "@/api/api";
import {TodolistResponseType} from "@/api/types";
import {AppThunk} from "@/store/redux/types";
import {setAppErrorAC, setAppStatusAC, SetEmptyDataValuesType} from "@/store/redux/reducers/appReducer";
import {RequestAppStatusType} from "@/app/types";
import {handleServerAppError, handleServerNetworkError} from "@/utils/errorUtils";
import {AxiosError} from "axios";
import {fetchTasksTC} from "@/store/redux/reducers/taskReducer";

const initialState: Array<TodolistType> = [];

export const todolistReducer = (state: Array<TodolistType> = initialState, action: TodolistActionsType): Array<TodolistType> => {
  switch (action.type) {
    case "TODOLISTS/SET-TODOLISTS": {
      const {todolists} = action.payload;
      return todolists.map(tl => ({...tl, filter: "All", entityStatus: "idle"}));
    }
    case "TODOLISTS/REMOVE-TODOLIST": {
      const {todoId} = action.payload;
      return state.filter((tl) => tl.id !== todoId);
    }
    case "TODOLISTS/ADD-TODOLIST": {
      const {todolist} = action.payload;
      return [{...todolist, filter: "All", entityStatus: "idle"}, ...state];
    }
    case "TODOLISTS/CHANGE-FILTER": {
      const {todoId, value} = action.payload;
      return state.map((todo) => todo.id === todoId ? {...todo, filter: value} : todo);
    }
    case "TODOLISTS/CHANGE-TODOLIST-TITLE": {
      const {todoId, title} = action.payload;
      return state.map((tl) => tl.id === todoId ? {...tl, title} : tl);
    }
    case "TODOLISTS/CHANGE-TODOLIST-ENTITY-STATUS": {
      const {todoId, entityStatus} = action.payload;
      return state.map((tl) => tl.id === todoId ? {...tl, entityStatus} : tl);
    }
    case "APP/SET-EMPTY-DATA-VALUES": {
      return [];
    }
    default:
      return state;
  }
};

//actions
export const setTodolistsAC = (todolists: Array<TodolistResponseType>) => ({
  type: "TODOLISTS/SET-TODOLISTS",
  payload: {
    todolists
  }
}) as const;
export const removeTodolistAC = (todoId: string) => ({
  type: "TODOLISTS/REMOVE-TODOLIST",
  payload: {
    todoId
  }
}) as const;
export const addTodolistAC = (todolist: TodolistResponseType) => ({
  type: "TODOLISTS/ADD-TODOLIST",
  payload: {
    todolist
  }
}) as const;
export const changeFilterAC = (todoId: string, value: FilterValuesType) => ({
  type: "TODOLISTS/CHANGE-FILTER",
  payload: {
    todoId,
    value
  }
}) as const;
export const changeTodolistTitleAC = (todoId: string, title: string) => ({
  type: "TODOLISTS/CHANGE-TODOLIST-TITLE",
  payload: {
    todoId,
    title
  }
}) as const;
export const changeTodolistEntityStatusAC = (todoId: string, entityStatus: RequestAppStatusType) => ({
  type: "TODOLISTS/CHANGE-TODOLIST-ENTITY-STATUS",
  payload: {
    todoId,
    entityStatus
  }
}) as const;


//thunks
export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC("loading"));
  api.todolistsApi.getTodolists()
    .then((res) => {
      if (res.status === 200) {
        dispatch(setTodolistsAC(res.data));
        dispatch(setAppStatusAC("succeeded"));
        return res.data;
      } else {
        dispatch(setAppErrorAC("Something went wrong when todos fetching!"));
        dispatch(setAppStatusAC("failed"));
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
  dispatch(setAppStatusAC("loading"));
  dispatch(changeTodolistEntityStatusAC(todoId, "loading"));
  api.todolistsApi.removeTodolist(todoId)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(removeTodolistAC(todoId));
        dispatch(setAppStatusAC("succeeded"));
        dispatch(changeTodolistEntityStatusAC(todoId, "idle"));
      } else {
        handleServerAppError(dispatch, res.data);
      }
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(dispatch, err.message || "Network error");
    });
};
export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC("loading"));
  api.todolistsApi.createTodolist(title)
    .then((res) => {
      if (res.data.resultCode === 0) {
        const {item} = res.data.data;
        dispatch(addTodolistAC(item));
        dispatch(setAppStatusAC("succeeded"));
      } else {
        handleServerAppError(dispatch, res.data);
      }
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(dispatch, err.message || "Network error");
    });
};
export const changeTodolistTitleTC = (todoId: string, title: string): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC("loading"));
  api.todolistsApi.updateTodolist(todoId, title)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(changeTodolistTitleAC(todoId, title));
        dispatch(setAppStatusAC("succeeded"));
      } else {
        handleServerAppError(dispatch, res.data);
      }
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(dispatch, err.message || "Network error");
    });
};


//types
export type TodolistActionsType =
  | AddTodolistType
  | RemoveTodolistType
  | ReturnType<typeof changeFilterAC>
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistEntityStatusAC>
  | SetTodolistsType
  | SetEmptyDataValuesType;

export type AddTodolistType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsType = ReturnType<typeof setTodolistsAC>;