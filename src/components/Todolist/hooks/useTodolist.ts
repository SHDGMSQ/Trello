import {useCallback, useEffect} from "react";
import {addTaskTC, fetchTasksTC} from "@/store/reducers/taskReducer";
import {TodolistPropsType} from "@/components/Todolist/types";
import {TaskStatuses} from "@/api/types";
import {useAppDispatch} from "@/store/hooks/hooks";
import {changeFilterAC, changeTodolistTitleTC, removeTodolistTC} from "@/store/reducers/todolistReducer";

export const useTodolist = (props: TodolistPropsType) => {
  const dispatch = useAppDispatch();

  const {id, title, filter, tasks} = props;

  useEffect(() => {
    dispatch(fetchTasksTC(id));
  }, []);

  const removeTodolist = useCallback(() => {
    dispatch(removeTodolistTC(id));
  }, [dispatch, id]);

  const changeTodolistTitle = useCallback((title: string) => {
    dispatch(changeTodolistTitleTC(id, title));
  }, [dispatch, id]);

  const addTask = useCallback((title: string) => {
    dispatch(addTaskTC(id, title));
  }, [dispatch, id]);

  const onAllClickHandler = useCallback(() => {
    dispatch(changeFilterAC(id, "All"));
  }, [dispatch, id]);
  const onActiveClickHandler = useCallback(() => {
    dispatch(changeFilterAC(id, "Active"));
  }, [dispatch, id]);
  const onCompletedClickHandler = useCallback(() => {
    dispatch(changeFilterAC(id, "Completed"));
  }, [dispatch, id]);

  let tasksForTodolist = tasks;

  if (filter === "Active") {
    tasksForTodolist = tasksForTodolist.filter(task => task.status === TaskStatuses.New);
  }

  if (filter === "Completed") {
    tasksForTodolist = tasksForTodolist.filter(task => task.status === TaskStatuses.Completed);
  }

  return {
    tasksForTodolist,
    onCompletedClickHandler,
    onActiveClickHandler,
    onAllClickHandler,
    changeTodolistTitle,
    removeTodolist,
    addTask,
    filter,
    id,
    title,
  };
};