import {FilterValuesType, TodolistType} from "@/components/Todolist/types";
import {api} from "@/api/api";
import {TodolistResponseType} from "@/api/types";
import {AppThunk} from "@/store/types";
import {setAppStatusAC} from "@/store/reducers/appReducer";

const initialState: Array<TodolistType> = [];

export const todolistReducer = (state: Array<TodolistType> = initialState, action: TodolistActionsType): Array<TodolistType> => {
  switch (action.type) {
    case "TODOLISTS/SET-TODOLISTS": {
      const {todolists} = action.payload;
      return todolists.map(tl => ({...tl, filter: "All"}));
    }
    case "TODOLISTS/REMOVE-TODOLIST": {
      const {todoId} = action.payload;
      return state.filter((tl) => tl.id !== todoId);
    }
    case "TODOLISTS/ADD-TODOLIST": {
      const {todolist} = action.payload;
      return [{...todolist, filter: "All"}, ...state];
    }
    case "TODOLISTS/CHANGE-FILTER": {
      const {todoId, value} = action.payload;
      return state.map((todo) => todo.id === todoId ? {...todo, filter: value} : todo);
    }
    case "TODOLISTS/CHANGE-TODOLIST-TITLE": {
      const {todoId, title} = action.payload;
      return state.map((tl) => tl.id === todoId ? {...tl, title} : tl);
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


//thunks
export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC("loading"));
  api.todolistsApi.getTodolists()
    .then((res) => {
      dispatch(setTodolistsAC(res.data));
      dispatch(setAppStatusAC("succeeded"));
    });
};
export const removeTodolistTC = (todoId: string): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC("loading"));
  api.todolistsApi.removeTodolist(todoId)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(removeTodolistAC(todoId));
        dispatch(setAppStatusAC("succeeded"));
      }
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
      }
    });
};
export const changeTodolistTitleTC = (todoId: string, title: string): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC("loading"));
  api.todolistsApi.updateTodolist(todoId, title)
    .then((res) => {
      if (res.data.resultCode === 0) {
        const {} = res.data.data;
        dispatch(changeTodolistTitleAC(todoId, title));
        dispatch(setAppStatusAC("succeeded"));
      }
    });
};


//types
export type TodolistActionsType =
  | AddTodolistType
  | RemoveTodolistType
  | ReturnType<typeof changeFilterAC>
  | ReturnType<typeof changeTodolistTitleAC>
  | SetTodolistsType;

export type AddTodolistType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsType = ReturnType<typeof setTodolistsAC>;