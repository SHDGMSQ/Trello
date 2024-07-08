import {TasksType} from "@/components/Task/types";
import {AddTodolistType, RemoveTodolistType, todoId1, todoId2} from "@/store/reducers/todolistReducer";
import {v4 as uuidv4} from "uuid";

const initialState: TasksType = {
  [todoId1]: [
    {id: uuidv4(), title: "first task1", isDone: true,},
    {id: uuidv4(), title: "second task1", isDone: true,},
    {id: uuidv4(), title: "third task1", isDone: false,},
  ],
  [todoId2]: [
    {id: uuidv4(), title: "first task2", isDone: false,},
    {id: uuidv4(), title: "second task2", isDone: true,},
    {id: uuidv4(), title: "third task2", isDone: false,},
  ]
};

export const taskReducer = (state: TasksType = initialState, action: TasksActionsType): TasksType => {
  switch (action.type) {
    case "TODOLISTS/ADD-TODOLIST": {
      const {todoId} = action.payload;
      return {...state, [todoId]: []};
    }
    case "TASKS/ADD-TASK": {
      const {todoId, title} = action.payload;
      return {...state, [todoId]: [{id: uuidv4(), title, isDone: false}, ...state[todoId]]};
    }
    case "TASKS/CHANGE-TASK-STATUS": {
      const {todoId, taskId, status} = action.payload;
      return {...state, [todoId]: state[todoId].map((task) => task.id === taskId ? {...task, isDone: status} : task)};
    }
    case "TASKS/REMOVE-TASK": {
      const {todoId, taskId} = action.payload;
      return {...state, [todoId]: state[todoId].filter((task) => task.id !== taskId)};
    }
    case "TASKS/CHANGE-TASK-TITLE": {
      const {todoId, taskId, title} = action.payload;
      return {...state, [todoId]: state[todoId].map((task) => task.id === taskId ? {...task, title} : task)};
    }
    case "TODOLISTS/REMOVE-TODOLIST": {
      const {todoId} = action.payload;
      const stateCopy = {...state};
      delete stateCopy[todoId];
      return stateCopy;
    }
    default:
      return state;
  }
};

//actions
export const addTaskAC = (todoId: string, title: string) => ({
  type: "TASKS/ADD-TASK",
  payload: {
    todoId,
    title
  }
}) as const;
export const changeTaskStatusAC = (todoId: string, taskId: string, status: boolean) => ({
  type: "TASKS/CHANGE-TASK-STATUS",
  payload: {
    todoId,
    taskId,
    status
  }
}) as const;
export const removeTaskAC = (todoId: string, taskId: string) => ({
  type: "TASKS/REMOVE-TASK",
  payload: {
    todoId,
    taskId
  }
}) as const;
export const changeTaskTitleAC = (todoId: string, taskId: string, title: string) => ({
  type: "TASKS/CHANGE-TASK-TITLE",
  payload: {
    todoId,
    taskId,
    title
  }
}) as const;

//types
type TasksActionsType =
  | AddTaskType
  | ChangeTaskStatusType
  | RemoveTaskType
  | ChangeTaskTitleType
  | AddTodolistType
  | RemoveTodolistType;

type AddTaskType = ReturnType<typeof addTaskAC>;
type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>;
type RemoveTaskType = ReturnType<typeof removeTaskAC>;
type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>;