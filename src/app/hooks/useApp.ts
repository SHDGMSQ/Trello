import {useAppDispatch, useAppSelector} from "@/store/hooks/hooks";
import {useCallback, useEffect} from "react";
import {setIsInitializedAppTC} from "@/store/reducers/appReducer";
import {logoutTC} from "@/store/reducers/authReducer";

export const useApp = () => {
  const appStatus = useAppSelector(state => state.app.status);
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector(state => state.app.isInitialized);
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    dispatch(setIsInitializedAppTC());
  }, []);

  const onClickLogOut = useCallback( () => {
    dispatch(logoutTC());
  }, [dispatch]);

  return {
    appStatus,
    isInitialized,
    isLoggedIn,
    onClickLogOut
  };
};