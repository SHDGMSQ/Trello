import {TaskType} from "@/components/Task/types";
import {TodolistResponseType} from "@/api/types";
import {RequestAppStatusType} from "@/app/types";

export type TodolistPropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  filter: FilterValuesType;
}

export type TodolistType = TodolistResponseType & {
  filter: FilterValuesType,
  entityStatus: RequestAppStatusType
}

export type FilterValuesType = "All" | "Active" | "Completed";