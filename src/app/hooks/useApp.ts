import {FilterValuesType} from "@/components/Todolist/types";
import {useCallback, useEffect} from "react";
import {v4 as uuidv4} from "uuid";
import {
  addTodolistAC,
  changeFilterAC,
  changeTodolistTitleAC,
  fetchTodolistsTC,
  removeTodolistAC
} from "@/store/reducers/todolistReducer";
import {useAppDispatch, useAppSelector} from "@/store/hooks/hooks";

export const useApp = () => {
  const dispatch = useAppDispatch();
  const todolists = useAppSelector(state => state.todolists);
  const tasks = useAppSelector(state => state.tasks);

  useEffect(() => {
    dispatch(fetchTodolistsTC());
  }, []);

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