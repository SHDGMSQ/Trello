import {RemoveTaskPayload, TasksType, TaskType} from "@/components/Task/types";
import {api} from "@/api/api";
import {handleServerAppError, handleServerNetworkError} from "@/utils/errorUtils";
import {AxiosError} from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
  addTodolistTC, fetchTodolistsTC, removeTodolistTC,
} from "@/store/redux-toolkit/reducers/todolistReducer";
import {setAppStatusAC} from "@/store/redux-toolkit/reducers/appReducer";
import {RejectedType} from "@/pages/Login/types";

const initialState: TasksType = {};

//thunks
export const removeTaskTC = createAsyncThunk<RemoveTaskPayload, RemoveTaskPayload, RejectedType>("tasks/removeTask", async (param: RemoveTaskPayload, {
  dispatch,
  rejectWithValue
}) => {
  dispatch(setAppStatusAC({status: "loading"}));
  try {
    const res = await api.tasksApi.removeTask(param.todoId, param.taskId);
    if (res.data.resultCode === 0) {
      dispatch(setAppStatusAC({status: "succeeded"}));
      return {todoId: param.todoId, taskId: param.taskId};
    } else {
      handleServerAppError(dispatch, res.data);
      return rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors});
    }
  } catch (err) {
    const error: AxiosError = err;
    handleServerNetworkError(dispatch, err.message || "Network error");
    return rejectWithValue({errors: [error.message], fieldsErrors: []})
  }
});

export const fetchTasksTC = createAsyncThunk("tasks/fetchTasks", async (todoId: string, {
  dispatch,
  rejectWithValue
}) => {
  dispatch(setAppStatusAC({status: "loading"}));
  try {
    const res = await api.tasksApi.getTasks(todoId);
    if (!res.data.error) {
      dispatch(setAppStatusAC({status: "succeeded"}));
      return {todoId, tasks: res.data.items};
    } else {
      dispatch(setAppStatusAC({status: "failed"}));
      return rejectWithValue({errors: ["Something went wrong when tasks fetching"], fieldsErrors: []});
    }
  } catch (err) {
    const error: AxiosError = err;
    handleServerNetworkError(dispatch, err.message || "Network error");
    return rejectWithValue({errors: [error.message], fieldsErrors: []})
  }
});

export const addTaskTC = createAsyncThunk("tasks/addTask", async (param: {todoId: string, title: string}, {
  dispatch,
  rejectWithValue
}) => {
  dispatch(setAppStatusAC({status: "loading"}));
  try {
    const res = await api.tasksApi.createTask(param.todoId, param.title)
    if (res.data.resultCode === 0) {
      const {item} = res.data.data;
      dispatch(setAppStatusAC({status: "succeeded"}));
      return {todoId: param.todoId, task: item};
    } else {
      handleServerAppError(dispatch, res.data);
      return rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors});
    }
  } catch (err) {
    const error: AxiosError = err;
    handleServerNetworkError(dispatch, err.message || "Network error");
    return rejectWithValue({errors: [error.message], fieldsErrors: []})
  }
});

export const changeTaskTC = createAsyncThunk("tasks/changeTask", async (param: {todoId: string, updatedTask: TaskType}, {
  dispatch,
  rejectWithValue
}) => {
  dispatch(setAppStatusAC({status: "loading"}));
  try {
    const res = await api.tasksApi.updateTask(param.todoId, param.updatedTask);
    if (res.data.resultCode === 0) {
      const {item} = res.data.data;
      dispatch(setAppStatusAC({status: "succeeded"}));
      return {todoId: param.todoId, task: item};
    } else {
      handleServerAppError(dispatch, res.data);
      return rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors});
    }
  } catch (err) {
    const error: AxiosError = err;
    handleServerNetworkError(dispatch, err.message || "Network error");
    return rejectWithValue({errors: [error.message], fieldsErrors: []})
  }
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addTodolistTC.fulfilled, (state, action) => {
      const {todolist} = action.payload;
      state[todolist.id] = [];
    });
    builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
      const {todoId} = action.payload;
      delete state[todoId];
    });
    builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
      const {todolists} = action.payload;
      todolists.forEach((tl: any) => {
        state[tl.id] = [];
      });
    });
    builder.addCase(removeTaskTC.fulfilled, (state, action) => {
      const {todoId, taskId} = action.payload;
      const tasks = state[todoId];
      const index = tasks.findIndex(state => state.id === taskId);
      if (index > -1) {
        tasks.splice(index, 1);
      }
    });
    builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
      const {tasks, todoId} = action.payload;
      state[todoId] = tasks;
    });
    builder.addCase(addTaskTC.fulfilled, (state, action) => {
      const {todoId, task} = action.payload;
      state[todoId].unshift(task);
    });
    builder.addCase(changeTaskTC.fulfilled, (state, action) => {
      const {todoId, task} = action.payload;
      const tasks = state[todoId];
      const index = tasks.findIndex(el => el.id === task.id);
      if (index > -1) {
        tasks[index] = {...tasks[index], ...task};
      }
    })
  },
});

export const tasksReducer = tasksSlice.reducer;