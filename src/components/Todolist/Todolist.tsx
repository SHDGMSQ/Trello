import React, {memo} from "react";
import {Task} from "@/components/Task/Task";
import styles from "./Todolist.module.scss";
import {TodolistPropsType} from "@/components/Todolist/types";
import {AddItemForm} from "@/components/AddItemForm/AddItemForm";
import {Grid, Paper} from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {useTodolist} from "@/components/Todolist/hooks/useTodolist";
import {EditableListTitle} from "@/components/EditableListTitle/EditableListTitle";
import {TodolistPopup} from "@/components/TodolistPopup/TodolistPopup";

export const Todolist = memo((props: TodolistPropsType) => {

  const {
    changeTodolistTitleHandler,
    removeTodolistHandler,
    tasksForTodolist,
    onAllClickHandler,
    onActiveClickHandler,
    onCompletedClickHandler,
    addTaskHandler,
    filter,
    id,
    title,
    entityStatus,
  } = useTodolist(props);

  return (
    <Grid item>
      <Paper elevation={4} sx={{borderRadius: "12px", backgroundColor: "#f1f2f4"}}>
        <div className={styles.container}>
          <div className={styles.todoHeader}>
            <EditableListTitle title={title} changeTitle={changeTodolistTitleHandler} disabled={entityStatus === "loading"}/>
            <TodolistPopup entityStatus={entityStatus} todoId={id} removeTodolist={removeTodolistHandler}/>
          </div>
          <AddItemForm addItem={addTaskHandler} disabled={entityStatus === "loading"}/>
          {
            tasksForTodolist.map((task) =>
              <Task
                key={task.id}
                todoId={id}
                task={task}
                todoEntityStatus={entityStatus}
              />
            )
          }
          <Stack direction="row" spacing={1} className={styles.btnsContainer}>
            <Button
              color="primary"
              onClick={onAllClickHandler}
              variant={filter === "All" ? "contained" : "text"}
              disabled={entityStatus === "loading"}
            >
              All
            </Button>
            <Button
              variant={filter === "Active" ? "contained" : "text"}
              color="primary"
              onClick={onActiveClickHandler}
              disabled={entityStatus === "loading"}
            >
              Active
            </Button>
            <Button
              variant={filter === "Completed" ? "contained" : "text"}
              color="primary"
              onClick={onCompletedClickHandler}
              disabled={entityStatus === "loading"}
            >
              Completed
            </Button>
          </Stack>
        </div>
      </Paper>
    </Grid>
  );
});
