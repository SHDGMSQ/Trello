import {TaskType} from "@/components/Task/types";

export interface TodolistPropsType {
  id: string;
  title: string;
  tasks: Array<TaskType>;
}

export interface TodolistType {
  id: string;
  title: string;
}