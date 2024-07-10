import {useAppSelector} from "@/store/hooks/hooks";

export const useApp = () => {
  const appStatus = useAppSelector(state => state.app.status);

  return {
    appStatus
  };
};