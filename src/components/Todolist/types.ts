import {TaskType} from "@/components/Task/types";

export type TodolistPropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTodolist: (id: string) => void;
  changeFilter: (todoId: string, value: FilterValuesType) => void;
  filter: FilterValuesType;
  changeTodoTitle: (id: string, title: string) => void;
}

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType
}

export type FilterValuesType = "All" | "Active" | "Completed";