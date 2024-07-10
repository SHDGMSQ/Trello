import {TasksType, TaskType} from "@/components/Task/types";
import {AddTodolistType, RemoveTodolistType, SetTodolistsType,} from "@/store/reducers/todolistReducer";
import {api} from "@/api/api";
import {AppThunk} from "@/store/types";
import {setAppErrorAC, setAppStatusAC} from "@/store/reducers/appReducer";
import {handleServerAppError, handleServerNetworkError} from "@/utils/errorUtils";
import {AxiosError} from "axios/index";

const initialState: TasksType = {};

export const taskReducer = (state: TasksType = initialState, action: TasksActionsType): TasksType => {
  switch (action.type) {
    case "TASKS/SET-TASKS": {
      const {todoId, tasks} = action.payload;
      return {...state, [todoId]: tasks};
    }
    case "TASKS/ADD-TASK": {
      const {todoId, task} = action.payload;
      return {
        ...state, [todoId]: [task, ...state[todoId]]
      };
    }
    case "TASKS/CHANGE-TASK": {
      const {todoId, task} = action.payload;
      return {...state, [todoId]: state[todoId].map((t) => t.id === task.id ? {...task} : t)};
    }
    case "TASKS/REMOVE-TASK": {
      const {todoId, taskId} = action.payload;
      return {...state, [todoId]: state[todoId].filter((task) => task.id !== taskId)};
    }
    case "TODOLISTS/ADD-TODOLIST": {
      const {todolist} = action.payload;
      return {...state, [todolist.id]: []};
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

    default:
      return state;
  }
};

//actions
export const setTasksAC = (todoId: string, tasks: Array<TaskType>) => ({
  type: "TASKS/SET-TASKS",
  payload: {
    todoId,
    tasks
  }
}) as const;
export const addTaskAC = (todoId: string, task: TaskType) => ({
  type: "TASKS/ADD-TASK",
  payload: {
    todoId,
    task
  }
}) as const;
export const changeTaskAC = (todoId: string, task: TaskType) => ({
  type: "TASKS/CHANGE-TASK",
  payload: {
    todoId,
    task
  }
}) as const;
export const removeTaskAC = (todoId: string, taskId: string) => ({
  type: "TASKS/REMOVE-TASK",
  payload: {
    todoId,
    taskId
  }
}) as const;

//thunks
export const fetchTasksTC = (todoId: string): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC("loading"));
  api.tasksApi.getTasks(todoId)
    .then((res) => {
      if (!res.data.error) {
        dispatch(setTasksAC(todoId, res.data.items));
        dispatch(setAppStatusAC("succeeded"));
      } else {
        dispatch(setAppErrorAC("Something went wrong when tasks fetching"));
        dispatch(setAppStatusAC("failed"));
      }
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(dispatch, err.message || "Network error");
    });
};
export const addTaskTC = (todoId: string, title: string): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC("loading"));
  api.tasksApi.createTask(todoId, title)
    .then((res) => {
      if (res.data.resultCode === 0) {
        const {item} = res.data.data;
        dispatch(addTaskAC(todoId, item));
        dispatch(setAppStatusAC("succeeded"));
      } else {
        handleServerAppError(dispatch, res.data)
      }
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(dispatch, err.message || "Network error");
    });
};
export const changeTaskTC = (todoId: string, updatedTask: TaskType): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC("loading"));
  api.tasksApi.updateTask(todoId, updatedTask)
    .then((res) => {
      if (res.data.resultCode === 0) {
        const {item} = res.data.data;
        dispatch(changeTaskAC(todoId, item));
        dispatch(setAppStatusAC("succeeded"));
      } else {
        handleServerAppError(dispatch, res.data)
      }
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(dispatch, err.message || "Network error");
    });
};
export const removeTaskTC = (todoId: string, taskId: string): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC("loading"));
  api.tasksApi.removeTask(todoId, taskId)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(removeTaskAC(todoId, taskId));
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
export type TasksActionsType =
  | ReturnType<typeof setTasksAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof changeTaskAC>
  | ReturnType<typeof removeTaskAC>
  | AddTodolistType
  | RemoveTodolistType
  | SetTodolistsType;