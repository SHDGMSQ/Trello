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
  status: number;
  priority: number;
  startDate: string | null;
  deadline: string | null;
  addedDate: string;
};