import {useCallback, useEffect} from "react";
import {addTodolistTC, fetchTodolistsTC,} from "@/store/reducers/todolistReducer";
import {useAppDispatch, useAppSelector} from "@/store/hooks/hooks";

export const useApp = () => {
  const dispatch = useAppDispatch();
  const todolists = useAppSelector(state => state.todolists);
  const tasks = useAppSelector(state => state.tasks);

  useEffect(() => {
    dispatch(fetchTodolistsTC());
  }, []);

  const addTodolist = useCallback((title: string) => {
    dispatch(addTodolistTC(title));
  }, [dispatch]);

  return {
    todolists,
    tasks,
    addTodolist,
  };
};