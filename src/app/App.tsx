import {Box, LinearProgress} from "@mui/material";
import {useApp} from "@/app/hooks/useApp";
import {TodolistsList} from "@/pages/TodolistsList/TodolistsList";
import {ErrorSnackbar} from "@/components/ErrorSnackbar/ErrorSnackbar";

export const App = () => {
  const {appStatus} = useApp();

  return (
    <Box>
      <ErrorSnackbar/>
      {appStatus === "loading" && <LinearProgress/>}
      <TodolistsList/>
    </Box>
  );
};

