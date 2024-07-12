import {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/store/redux-toolkit/hooks/hooks";
import {setIsInitializedAppTC} from "@/store/redux-toolkit/reducers/appReducer";
import {logoutTC} from "@/store/redux-toolkit/reducers/authReducer";

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