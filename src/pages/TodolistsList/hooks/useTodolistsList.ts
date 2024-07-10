import {useAppDispatch, useAppSelector} from "@/store/hooks/hooks";
import {useCallback, useEffect} from "react";
import {addTodolistTC, fetchTodolistsTC} from "@/store/reducers/todolistReducer";

export const useTodolistsList = () => {
  const todolists = useAppSelector(state => state.todolists);
  const tasks = useAppSelector(state => state.tasks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodolistsTC());
  }, []);

  const addTodolist = useCallback((title: string) => {
    dispatch(addTodolistTC(title));
  }, [dispatch]);

  return {todolists, tasks, addTodolist};
};