import {TaskType} from "@/components/Task/types";
import {TodolistResponseType} from "@/api/types";

export type TodolistPropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  filter: FilterValuesType;
}

export type TodolistType = TodolistResponseType & {
  filter: FilterValuesType
}

export type FilterValuesType = "All" | "Active" | "Completed";