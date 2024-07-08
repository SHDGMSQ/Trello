import styles from "./App.module.scss";
import {v4 as uuidv4} from "uuid";
import {Todolist} from "@/components/Todolist/Todolist";
import {useCallback} from "react";
import {FilterValuesType, TodolistType} from "@/components/Todolist/types";
import {TasksType} from "@/components/Task/types";
import {AddItemForm} from "@/components/AddItemForm/AddItemForm";
import {Box, Grid, Paper} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {addTodolistAC, changeFilterAC, changeTodolistTitleAC, removeTodolistAC} from "@/store/reducers/todolistReducer";
import {AppRootStateType} from "@/store/store";

export const App = () => {

  const dispatch = useDispatch();
  const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists);
  const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks);

  const addTodolist = useCallback((title: string) => {
    const todoId = uuidv4();
    dispatch(addTodolistAC(todoId, title));
  }, [dispatch]);

  const removeTodolist = useCallback((todoId: string) => {
    dispatch(removeTodolistAC(todoId));
  }, [dispatch]);

  const changeFilter = useCallback((todoId: string, value: FilterValuesType) => {
    dispatch(changeFilterAC(todoId, value));
  }, [dispatch]);

  const changeTodolistTitle = useCallback((todoId: string, title: string) => {
    dispatch(changeTodolistTitleAC(todoId, title));
  }, [dispatch]);

  return (
    <Box>
      <Grid container padding={2}>
        <AddItemForm addItem={addTodolist}/>
      </Grid>
      <div>
        <Grid container spacing={4} padding={2}>
          {
            todolists.map((tl) =>
              <Grid key={tl.id} item>
                <Paper elevation={3}>
                  <Todolist
                    id={tl.id}
                    tasks={tasks[tl.id]}
                    title={tl.title}
                    removeTodolist={removeTodolist}
                    changeFilter={changeFilter}
                    filter={tl.filter}
                    changeTodoTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            )
          }
        </Grid>
      </div>
    </Box>
  );
};