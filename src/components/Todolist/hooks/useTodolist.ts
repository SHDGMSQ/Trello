import {useDispatch} from "react-redux";
import {useCallback} from "react";
import {addTaskAC} from "@/store/reducers/taskReducer";
import {TodolistPropsType} from "@/components/Todolist/types";
import {TaskStatuses} from "@/api/types";

export const useTodolist = (props: TodolistPropsType) => {
  const dispatch = useDispatch();

  const {id, title, filter, tasks, removeTodolist, changeFilter, changeTodoTitle} = props;

  const removeTodolistHandler = useCallback(() => {
    removeTodolist(id);
  }, [removeTodolist, id]);

  const changeTodolistTitleHandler = useCallback((title: string) => {
    changeTodoTitle(id, title);
  }, [changeTodoTitle, id]);

  const addTask = useCallback((title: string) => {
    dispatch(addTaskAC(id, title));
  }, [dispatch, id]);

  const onAllClickHandler = useCallback(() => {
    changeFilter(id, "All");
  }, [changeFilter, id]);
  const onActiveClickHandler = useCallback(() => {
    changeFilter(id, "Active");
  }, [changeFilter, id]);
  const onCompletedClickHandler = useCallback(() => {
    changeFilter(id, "Completed");
  }, [changeFilter, id]);

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
    changeTodolistTitleHandler,
    removeTodolistHandler,
    addTask,
    filter,
    id,
    title,
  };
};