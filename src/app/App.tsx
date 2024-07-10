import {Todolist} from "@/components/Todolist/Todolist";
import {AddItemForm} from "@/components/AddItemForm/AddItemForm";
import {Box, Grid, LinearProgress, Paper} from "@mui/material";
import {useApp} from "@/app/hooks/useApp";
import {memo} from "react";
import {TodolistsList} from "@/pages/TodolistsList/TodolistsList";

export const App = () => {

  const {todolists, addTodolist, tasks, appStatus} = useApp();

  return (
    <Box>
      {appStatus === "loading" && <LinearProgress />}
      <Grid container padding={2}>
        <AddItemForm addItem={addTodolist}/>
      </Grid>
      <TodolistsList todolists={todolists} tasks={tasks}/>
    </Box>
  );
};

