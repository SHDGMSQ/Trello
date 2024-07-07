import {TaskType} from "@/components/Task/types";

export type TodolistPropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTodolist: (id: string) => void;
  addTask: (todoId: string, title: string) => void;
  changeTaskStatus: (todoId: string, taskId: string, status: boolean) => void;
  changeTasks: (todoId: string, value: FilterValuesType) => void;
  filter: FilterValuesType;
  removeTask: (todoId: string, taskId: string) => void;
  changeTaskTitle: (todoId: string, taskId: string, title: string) => void;
  changeTodoTitle: (id: string, title: string) => void;
}

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType
}

export type FilterValuesType  = "All" | "Active" | "Completed";