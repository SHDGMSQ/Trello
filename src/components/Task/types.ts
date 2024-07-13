import {TaskResponseType} from "@/api/types";
import {RequestAppStatusType} from "@/app/types";

export type TasksType = {
  [key: string]: Array<TaskType>;
}

export type TaskType = TaskResponseType;

export type TaskPropsType = {
  task: TaskType;
  todoId: string;
  todoEntityStatus: RequestAppStatusType;
}

export type RemoveTaskPayload = {
  todoId: string;
  taskId: string;
}