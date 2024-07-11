import {useCallback} from "react";
import {TodolistPropsType} from "@/components/Todolist/types";
import {TaskStatuses} from "@/api/types";
import {useAppDispatch} from "@/store/redux-toolkit/hooks/hooks";
import {changeFilterAC, changeTodolistTitleTC, removeTodolistTC} from "@/store/redux-toolkit/reducers/todolistReducer";
import {addTaskTC} from "@/store/redux-toolkit/reducers/taskReducer";

export const useTodolist = (props: TodolistPropsType) => {
  const dispatch = useAppDispatch();

  const {id, title, filter, tasks, entityStatus} = props;

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
    dispatch(changeFilterAC({todoId: id, value: "All"}));
  }, [dispatch, id]);
  const onActiveClickHandler = useCallback(() => {
    dispatch(changeFilterAC({todoId: id, value: "Active"}));
  }, [dispatch, id]);
  const onCompletedClickHandler = useCallback(() => {
    dispatch(changeFilterAC({todoId: id, value: "Completed"}));
  }, [dispatch, id]);

  let tasksForTodolist = tasks || [];


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
    entityStatus,
  };
};