import {FilterValuesType, TodolistType} from "@/components/Todolist/types";
import {api} from "@/api/api";
import {TodolistResponseType} from "@/api/types";
import {AppThunk} from "@/store/types";

const initialState: Array<TodolistType> = [];

export const todolistReducer = (state: Array<TodolistType> = initialState, action: TodolistActionsType): Array<TodolistType> => {
  switch (action.type) {
    case "TODOLISTS/ADD-TODOLIST": {
      const {todoId, title} = action.payload;
      return [
        {
          id: todoId,
          title,
          filter: "All",
          addedDate: "",
          order: 0,
        }, ...state
      ];
    }
    case "TODOLISTS/REMOVE-TODOLIST": {
      const {todoId} = action.payload;
      return state.filter((tl) => tl.id !== todoId);
    }
    case "TODOLISTS/CHANGE-FILTER": {
      const {todoId, value} = action.payload;
      return state.map((todo) => todo.id === todoId ? {...todo, filter: value} : todo);
    }
    case "TODOLISTS/CHANGE-TODOLIST-TITLE": {
      const {todoId, title} = action.payload;
      return state.map((tl) => tl.id === todoId ? {...tl, title} : tl);
    }
    case "TODOLISTS/SET-TODOLISTS": {
      const {todolists} = action.payload;
      return todolists.map(tl => ({...tl, filter: "All"}));
    }
    default:
      return state;
  }
};

//actions
export const addTodolistAC = (todoId: string, title: string) => ({
  type: "TODOLISTS/ADD-TODOLIST",
  payload: {
    todoId,
    title
  }
}) as const;
export const removeTodolistAC = (todoId: string) => ({
  type: "TODOLISTS/REMOVE-TODOLIST",
  payload: {
    todoId
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
export const setTodolistsAC = (todolists: Array<TodolistResponseType>) => ({
  type: "TODOLISTS/SET-TODOLISTS",
  payload: {
    todolists
  }
}) as const;

//thunks
export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
  api.todolistsApi.getTodolists()
    .then((res) => {
      dispatch(setTodolistsAC(res.data));
    });
};

//types
export type TodolistActionsType =
  | AddTodolistType
  | RemoveTodolistType
  | ChangeFilterType
  | ChangeTodoTitleType
  | SetTodolistsType;

export type AddTodolistType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>;
type ChangeFilterType = ReturnType<typeof changeFilterAC>;
type ChangeTodoTitleType = ReturnType<typeof changeTodolistTitleAC>;
export type SetTodolistsType = ReturnType<typeof setTodolistsAC>;