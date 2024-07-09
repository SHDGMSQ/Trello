import {ChangeEvent, useCallback} from "react";
import {TaskPropsType} from "@/components/Task/types";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "@/store/reducers/taskReducer";
import {useDispatch} from "react-redux";

export const useTask = (props: TaskPropsType) => {
  const {task, todoId} = props;

  const dispatch = useDispatch();

  const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeTaskStatusAC(todoId, task.id, e.currentTarget.checked));
  }, [dispatch, todoId, task.id]);

  const removeTask = useCallback(() => {
    dispatch(removeTaskAC(todoId, task.id));
  }, [dispatch, todoId, task.id]);

  const changeTaskTitle = useCallback((title: string) => {
    dispatch(changeTaskTitleAC(todoId, task.id, title));
  }, [dispatch, todoId, task.id]);

  return {
    changeTaskTitle,
    removeTask,
    changeTaskStatus,
    task,
  };
};