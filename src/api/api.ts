import axios, {AxiosResponse} from "axios";
import {GetTasksResponseType, ResponseType, TaskResponseType, TodolistResponseType,} from "@/api/types";
import {LoginType} from "@/pages/Login/types";
import {UpdateTaskDataType} from "@/components/Task/types";

axios.defaults.headers.common["API-KEY"] = "b365fbe8-0446-4f2a-ad5f-3c9421879b5e";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://social-network.samuraijs.com/api/1.1/";

const todolistsApi = {
  getTodolists() {
    return axios.get<any, AxiosResponse<TodolistResponseType[]>>("todo-lists");
  },
  createTodolist(title: string) {
    return axios.post<any, AxiosResponse<ResponseType<{ item: TodolistResponseType }>>, { title: string }>("todo-lists", {title});
  },
  removeTodolist(todoId: string) {
    return axios.delete<any, AxiosResponse<ResponseType>>(`todo-lists/${todoId}`);
  },
  updateTodolist(todoId: string, title: string) {
    return axios.put<any, AxiosResponse<ResponseType>, { title: string }>(`todo-lists/${todoId}`, {title});
  },
};

const tasksApi = {
  getTasks(todoId: string) {
    return axios.get<any, AxiosResponse<GetTasksResponseType>>(`todo-lists/${todoId}/tasks`);
  },
  createTask(todoId: string, title: string) {
    return axios.post<any, AxiosResponse<ResponseType<{ item: TaskResponseType }>>, { title: string }>(`todo-lists/${todoId}/tasks`, {title});
  },
  removeTask(todoId: string, taskId: string) {
    return axios.delete<any, AxiosResponse<ResponseType>>(`todo-lists/${todoId}/tasks/${taskId}`);
  },
  updateTask(todoId: string, task: TaskResponseType) {
    return axios.put<any, AxiosResponse<ResponseType<{ item: TaskResponseType }>>, TaskResponseType>(`todo-lists/${todoId}/tasks/${task.id}`, task);
  },
};

const authApi = {
  login(data: LoginType) {
    return axios.post<any, AxiosResponse<ResponseType<{ userId?: number }>>, LoginType>(`auth/login`, data);
  },
  logout() {
    return axios.delete<any, AxiosResponse<ResponseType>, { data: LoginType }>(`auth/login`);
  },
  me() {
    return axios.get<any, AxiosResponse<ResponseType<{ id: number, email: string, login: string }>>, { data: LoginType }>(`auth/me`);
  },
};

export const api = {
  todolistsApi,
  tasksApi,
  authApi
};