import {RequestAppStatusType} from "@/app/types";

export type ListPopupPropsType = {
  entityStatus: RequestAppStatusType;
  todoId: string;
  removeTodolist: (todoId: string) => void;
}