import {TaskPriorities, TaskResponseType, TaskStatuses} from "@/api/types";
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

export type UpdateTaskModelType = {
  title?: string
  description?: string | null
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string | null
  deadline?: string | null
}

export type UpdateTaskDataType = {
  title: string
  description: string | null
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string | null
  deadline: string | null
}