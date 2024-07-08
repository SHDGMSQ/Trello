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
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "@/store/reducers/taskReducer";

export const App = () => {

  const dispatch = useDispatch();
  const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists);
  const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks);

  const addTodolist = useCallback((title: string) => {
    const todoId = uuidv4();
    dispatch(addTodolistAC(todoId, title));
  }, [dispatch, addTodolistAC]);

  const removeTodolist = useCallback((todoId: string) => {
    dispatch(removeTodolistAC(todoId));
  }, [dispatch, removeTodolistAC]);

  const addTask = useCallback((todoId: string, title: string) => {
    dispatch(addTaskAC(todoId, title));
  }, [dispatch, addTaskAC]);

  const changeTaskStatus = useCallback((todoId: string, taskId: string, status: boolean) => {
    dispatch(changeTaskStatusAC(todoId, taskId, status));
  }, [dispatch, changeTaskStatusAC]);

  const changeFilter = useCallback((todoId: string, value: FilterValuesType) => {
    dispatch(changeFilterAC(todoId, value));
  }, [dispatch, changeFilterAC]);

  const removeTask = useCallback((todoId: string, taskId: string) => {
    dispatch(removeTaskAC(todoId, taskId));
  }, [dispatch, removeTaskAC]);

  const changeTaskTitle = useCallback((todoId: string, taskId: string, title: string) => {
    dispatch(changeTaskTitleAC(todoId, taskId, title));
  }, [dispatch, changeTaskTitleAC]);

  const changeTodolistTitle = useCallback((todoId: string, title: string) => {
    dispatch(changeTodolistTitleAC(todoId, title));
  }, [dispatch, changeTodolistTitleAC]);

  return (
    <Box>
      <Grid container padding={2}>
        <AddItemForm addItem={addTodolist}/>
      </Grid>
      <div className={styles.todolists}>
        <Grid container spacing={4} padding={2}>
          {
            todolists.map((tl) =>
              <Grid key={tl.id} item>
                <Paper elevation={3}>
                  <Todolist
                    id={tl.id}
                    title={tl.title}
                    tasks={tasks[tl.id]}
                    removeTodolist={removeTodolist}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    changeFilter={changeFilter}
                    filter={tl.filter}
                    removeTask={removeTask}
                    changeTaskTitle={changeTaskTitle}
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