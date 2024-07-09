import axios, {AxiosResponse} from "axios";
import {GetTasksResponseType, ResponseType, TaskResponseType, TodolistResponseType,} from "@/api/types";

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
  deleteTodolist(todoId: string) {
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
  deleteTask(todoId: string, taskId: string) {
    return axios.delete<any, AxiosResponse<ResponseType>>(`todo-lists/${todoId}/tasks/${taskId}`);
  },
  updateTask(todoId: string, taskId: string, body: TaskResponseType) {
    return axios.put<any, AxiosResponse<ResponseType<{ item: TaskResponseType }>>, TaskResponseType>(`todo-lists/${todoId}/tasks/${taskId}`, body);
  },
};
export const api = {
  todolistsApi,
  tasksApi,
};