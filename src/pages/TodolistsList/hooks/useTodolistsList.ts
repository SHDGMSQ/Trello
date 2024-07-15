import {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/store/redux-toolkit/hooks/hooks";
import {addTodolist, fetchTodolists} from "@/store/redux-toolkit/reducers/todolistReducer";

export const useTodolistsList = () => {
  const todolists = useAppSelector(state => state.todolists) || [];
  const tasks = useAppSelector(state => state.tasks);
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchTodolists());
    }
  }, []);

  const addTodolistHandler = useCallback((title: string) => {
    dispatch(addTodolist(title));
  }, [dispatch]);

  return {todolists, tasks, addTodolistHandler, isLoggedIn};
};