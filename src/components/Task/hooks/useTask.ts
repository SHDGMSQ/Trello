import {ChangeEvent, useCallback} from "react";
import {TaskPropsType} from "@/components/Task/types";
import {TaskStatuses} from "@/api/types";
import {useAppDispatch, useAppSelector} from "@/store/redux-toolkit/hooks/hooks";
import {changeTaskTC, removeTaskTC} from "@/store/redux-toolkit/reducers/taskReducer";

export const useTask = (props: TaskPropsType) => {
  const {task, todoId, todoEntityStatus} = props;

  const dispatch = useAppDispatch();
  const tasks = useAppSelector(state => state.tasks);

  const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
    const taskId = task.id
    dispatch(changeTaskTC({todoId, taskId, model: {status}}));
  }, [dispatch, todoId]);

  const removeTask = useCallback(() => {
    dispatch(removeTaskTC({todoId, taskId: task.id}));
  }, [dispatch, todoId, task.id]);

  const changeTaskTitle = useCallback((title: string) => {
    const taskId = task.id;
    dispatch(changeTaskTC({todoId, taskId, model: {title}}));
  }, [dispatch, todoId]);

  return {
    changeTaskTitle,
    removeTask,
    changeTaskStatus,
    task,
    todoEntityStatus
  };
};