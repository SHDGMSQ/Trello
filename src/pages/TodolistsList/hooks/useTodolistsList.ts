import {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/store/redux-toolkit/hooks/hooks";
import {addTodolistTC, fetchTodolistsTC} from "@/store/redux-toolkit/reducers/todolistReducer";

export const useTodolistsList = () => {
  const todolists = useAppSelector(state => state.todolists) || [];
  const tasks = useAppSelector(state => state.tasks);
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchTodolistsTC());
    }
  }, []);

  const addTodolist = useCallback((title: string) => {
    dispatch(addTodolistTC(title));
  }, [dispatch]);

  return {todolists, tasks, addTodolist, isLoggedIn};
};