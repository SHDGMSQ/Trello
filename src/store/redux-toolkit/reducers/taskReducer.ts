import {TasksType, TaskType} from "@/components/Task/types";
import {api} from "@/api/api";
import {handleServerAppError, handleServerNetworkError} from "@/utils/errorUtils";
import {AxiosError} from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "@/store/redux-toolkit/reducers/todolistReducer";
import {setAppErrorAC, setAppStatusAC, setEmptyDataAC} from "@/store/redux-toolkit/reducers/appReducer";
import {AppThunk} from "@/store/redux-toolkit/types";
import {Draft} from "immer";

const initialState: TasksType = {};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasksAC: (state: Draft<TasksType>, action: PayloadAction<{ todoId: string, tasks: Array<TaskType> }>) => {
      const {tasks, todoId} = action.payload;
      state[todoId] = tasks;
    },
    addTaskAC: (state: Draft<TasksType>, action: PayloadAction<{ todoId: string, task: TaskType }>) => {
      const {todoId, task} = action.payload;
      state[todoId].unshift(task);
    },
    changeTaskAC: (state: Draft<TasksType>, action: PayloadAction<{ todoId: string, task: TaskType }>) => {
      const {todoId, task} = action.payload;
      const tasks = state[todoId];
      const index = tasks.findIndex(el => el.id === task.id);
      if (index > -1) {
        tasks[index] = {...tasks[index], ...task};
      }
    },
    removeTaskAC: (state: Draft<TasksType>, action: PayloadAction<{ todoId: string, taskId: string }>) => {
      const {todoId, taskId} = action.payload;
      const tasks = state[todoId];
      const index = tasks.findIndex(state => state.id === taskId);
      if (index > -1) {
        tasks.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTodolistAC, (state, action) => {
      const {todolist} = action.payload;
      //state[todolist.id] = [];
    });
    builder.addCase(removeTodolistAC, (state, action) => {
      const {todoId} = action.payload;
      delete state[todoId];
    });
    builder.addCase(setTodolistsAC, (state, action) => {
      const {todolists} = action.payload;
      todolists.forEach((tl: any) => {
        state[tl.id] = [];
      });
    });
    builder.addCase(setEmptyDataAC.type, () => {
      return {};
    });

  },
});

export const tasksReducer = tasksSlice.reducer;

export const {setTasksAC, addTaskAC, changeTaskAC, removeTaskAC} = tasksSlice.actions;

//thunks
export const fetchTasksTC = (todoId: string): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC({status: "loading"}));
  api.tasksApi.getTasks(todoId)
    .then((res) => {
      if (!res.data.error) {
        dispatch(setTasksAC({todoId, tasks: res.data.items}));
        dispatch(setAppStatusAC({status: "succeeded"}));
      } else {
        dispatch(setAppErrorAC({error: "Something went wrong when tasks fetching"}));
        dispatch(setAppStatusAC({status: "failed"}));
      }
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(dispatch, err.message || "Network error");
    });
};
export const addTaskTC = (todoId: string, title: string): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC({status: "loading"}));
  api.tasksApi.createTask(todoId, title)
    .then((res) => {
      if (res.data.resultCode === 0) {
        const {item} = res.data.data;
        dispatch(addTaskAC({todoId, task: item}));
        dispatch(setAppStatusAC({status: "succeeded"}));
      } else {
        handleServerAppError(dispatch, res.data);
      }
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(dispatch, err.message || "Network error");
    });
};
export const changeTaskTC = (todoId: string, updatedTask: TaskType): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC({status: "loading"}));
  api.tasksApi.updateTask(todoId, updatedTask)
    .then((res) => {
      if (res.data.resultCode === 0) {
        const {item} = res.data.data;
        dispatch(changeTaskAC({todoId, task: item}));
        dispatch(setAppStatusAC({status: "succeeded"}));
      } else {
        handleServerAppError(dispatch, res.data);
      }
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(dispatch, err.message || "Network error");
    });
};
export const removeTaskTC = (todoId: string, taskId: string): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC({status: "loading"}));
  api.tasksApi.removeTask(todoId, taskId)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(removeTaskAC({todoId, taskId}));
        dispatch(setAppStatusAC({status: "succeeded"}));
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
  | ReturnType<typeof removeTaskAC>;