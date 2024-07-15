export type DeleteModalPropsType = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  todoId: string;
  removeTodolist: (todoId: string) => void;
}