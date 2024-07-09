export type TodolistResponseType = {
  addedDate: string;
  id: string;
  order: number;
  title: string
}

export type ResponseType<D = {}> = {
  data: D,
  messages: string[];
  fieldsErrors: string[];
  resultCode: number;
}

export type GetTasksResponseType = {
  items: TaskResponseType[];
  totalCount: number;
  error: string | null;
}

export type TaskResponseType = {
  id: string;
  title: string;
  description: string | null;
  todoListId: string;
  order: number;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string | null;
  deadline: string | null;
  addedDate: string;
};

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}