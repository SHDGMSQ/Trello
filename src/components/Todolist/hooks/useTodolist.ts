import {useCallback} from "react";
import {TodolistPropsType} from "@/components/Todolist/types";
import {TaskStatuses} from "@/api/types";
import {useAppDispatch} from "@/store/redux-toolkit/hooks/hooks";
import {changeFilter, changeTodolistTitle, removeTodolist} from "@/store/redux-toolkit/reducers/todolistReducer";
import {addTask} from "@/store/redux-toolkit/reducers/taskReducer";

export const useTodolist = (props: TodolistPropsType) => {
  const dispatch = useAppDispatch();

  const {id, title, filter, tasks, entityStatus} = props;

  const removeTodolistHandler = useCallback(() => {
    dispatch(removeTodolist(id));
  }, [dispatch, id]);

  const changeTodolistTitleHandler = useCallback((title: string) => {
    dispatch(changeTodolistTitle({todoId: id, title}));
  }, [dispatch, id]);

  const addTaskHandler = useCallback((title: string) => {
    dispatch(addTask({todoId: id, title}));
  }, [dispatch, id]);

  const onAllClickHandler = useCallback(() => {
    dispatch(changeFilter({todoId: id, value: "All"}));
  }, [dispatch, id]);
  const onActiveClickHandler = useCallback(() => {
    dispatch(changeFilter({todoId: id, value: "Active"}));
  }, [dispatch, id]);
  const onCompletedClickHandler = useCallback(() => {
    dispatch(changeFilter({todoId: id, value: "Completed"}));
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
    changeTodolistTitleHandler,
    removeTodolistHandler,
    addTaskHandler,
    filter,
    id,
    title,
    entityStatus,
  };
};