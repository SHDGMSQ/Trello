import {FilterValuesType, TodolistType} from "@/components/Todolist/types";
import {v4 as uuidv4} from "uuid";

export const todoId1 = uuidv4();
export const todoId2 = uuidv4();

const initialState: Array<TodolistType> = [
  {id: todoId1, title: "First", filter: "All"},
  {id: todoId2, title: "Second", filter: "All"},
];

export const todolistReducer = (state: Array<TodolistType> = initialState, action: TodolistActionsType): Array<TodolistType> => {
  switch (action.type) {
    case "TODOLISTS/ADD-TODOLIST": {
      const {todoId, title} = action.payload;
      return [{id: todoId, title, filter: "All"}, ...state];
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


//types
type TodolistActionsType =
  | AddTodolistType
  | RemoveTodolistType
  | ChangeFilterType
  | ChangeTodoTitleType;

export type AddTodolistType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>;
type ChangeFilterType = ReturnType<typeof changeFilterAC>;
type ChangeTodoTitleType = ReturnType<typeof changeTodolistTitleAC>;