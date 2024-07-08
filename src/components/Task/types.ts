export type TasksType = {
  [key: string]: Array<TaskType>;
}

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;

}

export type TaskPropsType = {
  task: TaskType;
  todoId: string;
  changeTaskStatus: (todoId: string, taskId: string, status: boolean) => void;
  removeTask: (todoId: string, taskId: string) => void;
  changeTaskTitle: (taskId: string, title: string) => void;
}