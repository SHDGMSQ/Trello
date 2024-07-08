import styles from "./App.module.scss";
import {v4 as uuidv4} from "uuid";
import {Todolist} from "@/components/Todolist/Todolist";
import {useCallback, useState} from "react";
import {FilterValuesType, TodolistType} from "@/components/Todolist/types";
import {TasksType} from "@/components/Task/types";
import {AddItemForm} from "@/components/AddItemForm/AddItemForm";
import {Box, Grid, Paper} from "@mui/material";

export const App = () => {
  const todoId1 = uuidv4();
  const todoId2 = uuidv4();

  const [todolists, setTodolists] = useState<Array<TodolistType>>([
    {id: todoId1, title: "First", filter: "All"},
    {id: todoId2, title: "Second", filter: "All"},
  ]);

  const [tasks, setTasks] = useState<TasksType>({
    [todoId1]: [
      {id: uuidv4(), title: "first task1", isDone: true,},
      {id: uuidv4(), title: "second task1", isDone: true,},
      {id: uuidv4(), title: "third task1", isDone: false,},
    ],
    [todoId2]: [
      {id: uuidv4(), title: "first task2", isDone: false,},
      {id: uuidv4(), title: "second task2", isDone: true,},
      {id: uuidv4(), title: "third task2", isDone: false,},
    ]
  });

  const addTodolist = useCallback((title: string) => {
    const todoId = uuidv4();
    setTodolists([{id: todoId, title, filter: "All"}, ...todolists]);
    setTasks({...tasks, [todoId]: []});
  }, [todolists, tasks]);

  const removeTodolist = useCallback((id: string) => {
    setTodolists(todolists.filter((tl) => tl.id !== id));
  }, [todolists]);

  const addTask = useCallback((todoId: string, title: string) => {
    setTasks({...tasks, [todoId]: [{id: uuidv4(), title, isDone: false}, ...tasks[todoId]]});
  }, [tasks]);

  const changeTaskStatus = useCallback((todoId: string, taskId: string, status: boolean) => {
    setTasks({...tasks, [todoId]: tasks[todoId].map((task) => task.id === taskId ? {...task, isDone: status} : task)});
  }, [tasks]);

  const changeTasks = useCallback((todoId: string, value: FilterValuesType) => {
    setTodolists(todolists.map((todo) => todo.id === todoId ? {...todo, filter: value} : todo));
  }, [todolists]);

  const removeTask = useCallback((todoId: string, taskId: string) => {
    setTasks({...tasks, [todoId]: tasks[todoId].filter((task) => task.id !== taskId)});
  }, [tasks]);

  const changeTaskTitle = useCallback((todoId: string, taskId: string, title: string) => {
    setTasks({...tasks, [todoId]: tasks[todoId].map((task) => task.id === taskId ? {...task, title} : task)});
  }, [tasks]);

  const changeTodoTitle = useCallback((id: string, title: string) => {
    setTodolists(todolists.map((tl) => tl.id === id ? {...tl, title} : tl));
  }, [todolists]);

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
                    changeTasks={changeTasks}
                    filter={tl.filter}
                    removeTask={removeTask}
                    changeTaskTitle={changeTaskTitle}
                    changeTodoTitle={changeTodoTitle}
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