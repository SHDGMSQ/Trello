export interface TasksType {
  [key: string]: Array<TaskType>;
}

export interface TaskType {
  id: string;
  title: string;
  isDone: boolean;
}

export interface TaskPropsType {
  title: string;
  isDone: boolean;
}