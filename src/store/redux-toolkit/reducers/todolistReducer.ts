import {FilterValuesType, TodolistType} from "@/components/Todolist/types";
import {api} from "@/api/api";
import {TodolistResponseType} from "@/api/types";
import {RequestAppStatusType} from "@/app/types";
import {handleServerAppError, handleServerNetworkError} from "@/utils/errorUtils";
import {AxiosError} from "axios";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "@/store/redux-toolkit/types";
import {setAppErrorAC, setAppStatusAC, setEmptyDataAC} from "@/store/redux-toolkit/reducers/appReducer";
import {fetchTasksTC} from "@/store/redux-toolkit/reducers/taskReducer";
import {Draft} from "immer";

const initialState: Array<TodolistType> = [];

//thunks
export const fetchTodolistsTC = createAsyncThunk("todolists/fetchTodolists", async (_, {dispatch, rejectWithValue}) => {
  dispatch(setAppStatusAC({status: "loading"}));
  try {
    const res = await api.todolistsApi.getTodolists();
    if (res.status === 200) {
      dispatch(setAppStatusAC({status: "succeeded"}));
      res.data.forEach((tl) => {
        dispatch(fetchTasksTC(tl.id));
      })
      return {todolists: res.data};
    } else {
      dispatch(setAppStatusAC({status: "failed"}));
      return rejectWithValue({errors: ["Something went wrong when tasks fetching"], fieldsErrors: []});
    }
  } catch (err) {
    const error: AxiosError = err;
    handleServerNetworkError(dispatch, err.message || "Network error");
    return rejectWithValue({errors: [error.message], fieldsErrors: []})
  }
})

export const removeTodolistTC = createAsyncThunk("todolists/removeTodolist", async (todoId: string, {dispatch, rejectWithValue}) => {
  dispatch(setAppStatusAC({status: "loading"}));
  try {
    const res = await api.todolistsApi.removeTodolist(todoId);
    if (res.data.resultCode === 0) {
      dispatch(setAppStatusAC({status: "succeeded"}));
      dispatch(changeTodolistEntityStatusAC({todoId, entityStatus: "idle"}));
      return {todoId};
    } else {
      handleServerAppError(dispatch, res.data);
      return rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors});
    }
  } catch (err) {
    const error: AxiosError = err;
    handleServerNetworkError(dispatch, err.message || "Network error");
    return rejectWithValue({errors: [error.message], fieldsErrors: []})
  }
})

export const addTodolistTC = createAsyncThunk("todolists/addTodolist", async (title: string, {dispatch, rejectWithValue}) => {
  dispatch(setAppStatusAC({status: "loading"}));
  try {
    const res = await api.todolistsApi.createTodolist(title);
    if (res.data.resultCode === 0) {
      const {item} = res.data.data;
      dispatch(setAppStatusAC({status: "succeeded"}));
      return {todolist: item};
    } else {
      handleServerAppError(dispatch, res.data);
      return rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors});
    }
  } catch (err) {
    const error: AxiosError = err;
    handleServerNetworkError(dispatch, err.message || "Network error");
    return rejectWithValue({errors: [error.message], fieldsErrors: []})
  }
})

export const changeTodolistTitleTC = createAsyncThunk("todolists/changeTodolistTitle", async (param: {todoId: string, title: string}, {dispatch, rejectWithValue}) => {
  dispatch(setAppStatusAC({status: "loading"}));
  try {
    const res = await api.todolistsApi.updateTodolist(param.todoId, param.title);
    if (res.data.resultCode === 0) {
      dispatch(setAppStatusAC({status: "succeeded"}));
      return {todoId: param.todoId, title: param.title};
    } else {
      handleServerAppError(dispatch, res.data);
      return rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors});
    }
  } catch (err) {
    const error: AxiosError = err;
    handleServerNetworkError(dispatch, err.message || "Network error");
    return rejectWithValue({errors: [error.message], fieldsErrors: []})
  }
})

const todolistsSlice = createSlice({
  name: "todolists",
  initialState,
  reducers: {
    changeFilterAC: (state: Draft<Array<TodolistType>>, action: PayloadAction<{ todoId: string, value: FilterValuesType }>) => {
      const {todoId, value} = action.payload;
      const index = state.findIndex(el => el.id === todoId);
      state[index].filter = value;
    },
    changeTodolistEntityStatusAC: (state: Draft<Array<TodolistType>>, action: PayloadAction<{ todoId: string, entityStatus: RequestAppStatusType }>) => {
      const {todoId, entityStatus} = action.payload;
      const index = state.findIndex(el => el.id === todoId);
      state[index].entityStatus = entityStatus;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
      const {todolists} = action.payload;
      state.length = 0;
      todolists.forEach(tl => state.push({...tl, filter: "All", entityStatus: "idle"}));
    });
    builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
      const {todoId} = action.payload;
      const index = state.findIndex(state => state.id === todoId);
      if (index > -1) {
        state.splice(index, 1);
      }
    });
    builder.addCase(addTodolistTC.fulfilled, (state, action) => {
      const {todolist} = action.payload;
      state.unshift({...todolist, filter: "All", entityStatus: "idle"});
    });
    builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
      const {todoId, title} = action.payload;
      const index = state.findIndex(el => el.id === todoId);
      state[index].title = title;
    })
  }
});

export const todolistsReducer = todolistsSlice.reducer;

//actions
export const {
  changeTodolistEntityStatusAC,
  changeFilterAC,
} = todolistsSlice.actions;
