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
  id: string;
  todoId: string;
  changeTaskStatus: (todoId: string, taskId: string, status: boolean) => void;
  removeTask: (todoId: string, taskId: string) => void;
}