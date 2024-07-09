import {TasksType, TaskType} from "@/components/Task/types";
import {AddTodolistType, RemoveTodolistType, SetTodolistsType,} from "@/store/reducers/todolistReducer";
import {v4 as uuidv4} from "uuid";
import {TaskPriorities, TaskStatuses} from "@/api/types";
import {api} from "@/api/api";
import {AppThunk} from "@/store/types";

const initialState: TasksType = {};

export const taskReducer = (state: TasksType = initialState, action: TasksActionsType): TasksType => {
  switch (action.type) {
    case "TODOLISTS/ADD-TODOLIST": {
      const {todoId} = action.payload;
      return {...state, [todoId]: []};
    }
    case "TASKS/ADD-TASK": {
      const {todoId, title} = action.payload;
      return {
        ...state, [todoId]: [
          {
            id: uuidv4(),
            title,
            status: TaskStatuses.New,
            description: null,
            todoListId: todoId,
            order: 0,
            priority: TaskPriorities.Low,
            startDate: "",
            deadline: "",
            addedDate: ""
          }, ...state[todoId]]
      };
    }
    case "TASKS/CHANGE-TASK-STATUS": {
      const {todoId, taskId, status} = action.payload;
      return {...state, [todoId]: state[todoId].map((task) => task.id === taskId ? {...task, status} : task)};
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
    case "TODOLISTS/SET-TODOLISTS": {
      const {todolists} = action.payload;
      const copyState = {...state};
      todolists.forEach((tl) => copyState[tl.id] = []);
      return copyState;
    }
    case "TASKS/SET-TASKS": {
      const {todoId, tasks} = action.payload;
      return {...state, [todoId]: tasks};
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
export const changeTaskStatusAC = (todoId: string, taskId: string, status: TaskStatuses) => ({
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
export const setTasksAC = (todoId: string, tasks: Array<TaskType>) => ({
  type: "TASKS/SET-TASKS",
  payload: {
    todoId,
    tasks
  }
}) as const;

//thunks
export const fetchTasksTC = (todoId: string): AppThunk => (dispatch) => {
  api.tasksApi.getTasks(todoId)
    .then((res) => {
      dispatch(setTasksAC(todoId, res.data.items));
    })
};

//types
export type TasksActionsType =
  | AddTaskType
  | ChangeTaskStatusType
  | RemoveTaskType
  | ChangeTaskTitleType
  | AddTodolistType
  | RemoveTodolistType
  | SetTodolistsType
  | SetTasks;

type AddTaskType = ReturnType<typeof addTaskAC>;
type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>;
type RemoveTaskType = ReturnType<typeof removeTaskAC>;
type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>;
type SetTasks = ReturnType<typeof setTasksAC>;