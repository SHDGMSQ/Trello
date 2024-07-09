import {ChangeEvent, useCallback} from "react";
import {TaskPropsType} from "@/components/Task/types";
import {changeTaskTC, removeTaskTC} from "@/store/reducers/taskReducer";
import {TaskStatuses} from "@/api/types";
import {useAppDispatch} from "@/store/hooks/hooks";

export const useTask = (props: TaskPropsType) => {
  const {task, todoId} = props;

  const dispatch = useAppDispatch();

  const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const updatedTask = {...task, status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New};
    dispatch(changeTaskTC(todoId, updatedTask));
  }, [dispatch, todoId]);

  const removeTask = useCallback(() => {
    dispatch(removeTaskTC(todoId, task.id));
  }, [dispatch, todoId, task.id]);

  const changeTaskTitle = useCallback((title: string) => {
    const updatedTask = {...task, title};
    dispatch(changeTaskTC(todoId, updatedTask));
  }, [dispatch, todoId]);

  return {
    changeTaskTitle,
    removeTask,
    changeTaskStatus,
    task,
  };
};