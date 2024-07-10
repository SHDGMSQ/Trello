import {AddItemForm} from "@/components/AddItemForm/AddItemForm";
import {Box, Grid, LinearProgress} from "@mui/material";
import {useApp} from "@/app/hooks/useApp";
import {TodolistsList} from "@/pages/TodolistsList/TodolistsList";
import {ErrorSnackbar} from "@/components/ErrorSnackbar/ErrorSnackbar";

export const App = () => {

  const {todolists, addTodolist, tasks, appStatus} = useApp();

  return (
    <Box>
      {appStatus === "loading" && <LinearProgress/>}
      <ErrorSnackbar />
      <Grid container padding={2}>
        <AddItemForm addItem={addTodolist}/>
      </Grid>
      <TodolistsList todolists={todolists} tasks={tasks}/>
    </Box>
  );
};

