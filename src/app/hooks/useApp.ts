import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "@/store/store";
import {FilterValuesType, TodolistType} from "@/components/Todolist/types";
import {TasksType} from "@/components/Task/types";
import {useCallback, useEffect} from "react";
import {v4 as uuidv4} from "uuid";
import {
  addTodolistAC,
  changeFilterAC,
  changeTodolistTitleAC,
  fetchTodolistsTC,
  removeTodolistAC
} from "@/store/reducers/todolistReducer";

export const useApp = () => {
  const dispatch = useDispatch();
  const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists);
  const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks);

  useEffect(() => {
    dispatch(fetchTodolistsTC());
  }, [])

  const addTodolist = useCallback((title: string) => {
    const todoId = uuidv4();
    dispatch(addTodolistAC(todoId, title));
  }, [dispatch]);

  const removeTodolist = useCallback((todoId: string) => {
    dispatch(removeTodolistAC(todoId));
  }, [dispatch]);

  const changeFilter = useCallback((todoId: string, value: FilterValuesType) => {
    dispatch(changeFilterAC(todoId, value));
  }, [dispatch]);

  const changeTodolistTitle = useCallback((todoId: string, title: string) => {
    dispatch(changeTodolistTitleAC(todoId, title));
  }, [dispatch]);

  return {
    todolists,
    tasks,
    changeTodolistTitle,
    changeFilter,
    removeTodolist,
    addTodolist,
  };
};