import {TodolistType} from "@/components/Todolist/types";
import {TasksType} from "@/components/Task/types";

export type TodolistsListPropsType = {
  todolists: Array<TodolistType>;
  tasks: TasksType;
}