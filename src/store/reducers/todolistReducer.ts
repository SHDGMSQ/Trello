import {FilterValuesType, TodolistType} from "@/components/Todolist/types";
import {v4 as uuidv4} from "uuid";
import {Dispatch} from "redux";
import {api} from "@/api/api";
import {TodolistResponseType} from "@/api/types";

export const todoId1 = uuidv4();
export const todoId2 = uuidv4();

const initialState: Array<TodolistType> = [
  // {id: todoId1, title: "First", filter: "All", addedDate: "", order: 0},
  // {id: todoId2, title: "Second", filter: "All", addedDate: "", order: 0},
];

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
export const fetchTodolistsTC = (): any => (dispath: Dispatch) => {
  api.todolistsApi.getTodolists()
    .then((res) => {
      dispath(setTodolistsAC(res.data));
    })
}

//types
type TodolistActionsType =
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