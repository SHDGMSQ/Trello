import {memo, useCallback} from "react";
import {Task} from "@/components/Task/Task";
import styles from "./Todolist.module.scss";
import {TodolistPropsType} from "@/components/Todolist/types";
import {AddItemForm} from "@/components/AddItemForm/AddItemForm";
import {EditableSpan} from "@/components/EditableSpan/EditableSpan";
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "@/store/store";
import {TasksType} from "@/components/Task/types";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "@/store/reducers/taskReducer";

export const Todolist = memo((props: TodolistPropsType) => {
  const {id, title, filter, removeTodolist, changeFilter, changeTodoTitle} = props;

  const dispatch = useDispatch();
  const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)[id];

  const removeTodolistHandler = useCallback(() => {
    removeTodolist(id);
  }, [removeTodolist, id]);

  const addTask = useCallback((todoId: string, title: string) => {
    dispatch(addTaskAC(todoId, title));
  }, [dispatch, addTaskAC]);

  const changeTodolistTitleHandler = useCallback((title: string) => {
    changeTodoTitle(id, title);
  }, [changeTodoTitle, id, title]);

  const changeTaskStatus = useCallback((todoId: string, taskId: string, status: boolean) => {
    dispatch(changeTaskStatusAC(todoId, taskId, status));
  }, [dispatch, changeTaskStatusAC]);

  const removeTask = useCallback((todoId: string, taskId: string) => {
    dispatch(removeTaskAC(todoId, taskId));
  }, [dispatch, removeTaskAC]);

  const changeTaskTitle = useCallback((todoId: string, taskId: string, title: string) => {
    dispatch(changeTaskTitleAC(todoId, taskId, title));
  }, [dispatch, changeTaskTitleAC]);

  const onAllClickHandler = useCallback(() => {
    changeFilter(id, "All");
  }, [changeFilter, id]);
  const onActiveClickHandler = useCallback(() => {
    changeFilter(id, "Active");
  }, [changeFilter, id]);
  const onCompletedClickHandler = useCallback(() => {
    changeFilter(id, "Completed");
  }, [changeFilter, id]);

  let tasksForTodolist = tasks;

  if (filter === "Active") {
    tasksForTodolist = tasksForTodolist.filter(task => !task.isDone);
  }

  if (filter === "Completed") {
    tasksForTodolist = tasksForTodolist.filter(task => task.isDone);
  }

  return (
    <div className={styles.container}>
      <div className={styles.todoHeader}>
        <h3>
          <EditableSpan title={title} changeTitle={changeTodolistTitleHandler}/>
        </h3>
        <IconButton aria-label="delete" onClick={removeTodolistHandler}>
          <DeleteIcon/>
        </IconButton>
      </div>
      <AddItemForm addItem={(title: string) => addTask(id, title)}/>
      {
        tasksForTodolist.map((task) =>
          <Task
            key={task.id}
            id={task.id}
            todoId={id}
            title={task.title}
            isDone={task.isDone}
            changeTaskStatus={changeTaskStatus}
            removeTask={removeTask}
            changeTaskTitle={(title: string) => changeTaskTitle(id, task.id, title)}
          />
        )
      }
      <Stack direction="row" spacing={1} className={styles.btnsContainer}>
        <Button
          color="primary"
          onClick={onAllClickHandler}
          variant={filter === "All" ? "contained" : "text"}
        >
          All
        </Button>
        <Button
          variant={filter === "Active" ? "contained" : "text"}
          color="primary"
          onClick={onActiveClickHandler}
        >
          Active
        </Button>
        <Button
          variant={filter === "Completed" ? "contained" : "text"}
          color="primary"
          onClick={onCompletedClickHandler}
        >
          Completed
        </Button>
      </Stack>
    </div>
  );
});
