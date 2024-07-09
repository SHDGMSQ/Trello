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
}