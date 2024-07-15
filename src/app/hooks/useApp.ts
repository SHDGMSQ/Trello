import {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/store/redux-toolkit/hooks/hooks";
import {setIsInitializedApp} from "@/store/redux-toolkit/reducers/appReducer";
import {logout} from "@/store/redux-toolkit/reducers/authReducer";

export const useApp = () => {
  const appStatus = useAppSelector(state => state.app.status);
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector(state => state.app.isInitialized);
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    dispatch(setIsInitializedApp());
  }, []);

  const onClickLogOut = useCallback( () => {
    dispatch(logout());
  }, [dispatch]);

  return {
    appStatus,
    isInitialized,
    isLoggedIn,
    onClickLogOut
  };
};