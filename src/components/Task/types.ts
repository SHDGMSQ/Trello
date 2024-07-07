export type TasksType = {
  [key: string]: Array<TaskType>;
}

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;

}

export type TaskPropsType = {
  title: string;
  isDone: boolean;
  id: string;
  todoId: string;
  changeTaskStatus: (todoId: string, taskId: string, status: boolean) => void;
  removeTask: (todoId: string, taskId: string) => void;
}