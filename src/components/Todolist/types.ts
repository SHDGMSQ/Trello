import {TaskType} from "@/components/Task/types";

export interface TodolistPropsType {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTodolist: (id: string) => void;
  addTask: (todoId: string, title: string) => void;
  changeTaskStatus: (todoId: string, taskId: string, status: boolean) => void;
  changeTasks: (todoId: string, value: FilterValuesType) => void;
  filter: FilterValuesType;
  removeTask: (todoId: string, taskId: string) => void;
}

export interface TodolistType {
  id: string;
  title: string;
  filter: FilterValuesType
}

export type FilterValuesType  = "All" | "Active" | "Completed";