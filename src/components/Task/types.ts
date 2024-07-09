import {TaskResponseType} from "@/api/types";

export type TasksType = {
  [key: string]: Array<TaskType>;
}

export type TaskType = TaskResponseType;

export type TaskPropsType = {
  task: TaskType;
  todoId: string;
}