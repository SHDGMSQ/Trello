import {memo} from "react";
import {Task} from "@/components/Task/Task";
import styles from "./Todolist.module.scss";
import {TodolistPropsType} from "@/components/Todolist/types";
import {AddItemForm} from "@/components/AddItemForm/AddItemForm";
import {EditableSpan} from "@/components/EditableSpan/EditableSpan";
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {useTodolist} from "@/components/Todolist/hooks/useTodolist";

export const Todolist = memo((props: TodolistPropsType) => {

  const {
    changeTodolistTitle,
    removeTodolist,
    tasksForTodolist,
    onAllClickHandler,
    onActiveClickHandler,
    onCompletedClickHandler,
    addTask,
    filter,
    id,
    title
  } = useTodolist(props);

  return (
    <div className={styles.container}>
      <div className={styles.todoHeader}>
        <h3>
          <EditableSpan title={title} changeTitle={changeTodolistTitle}/>
        </h3>
        <IconButton aria-label="delete" onClick={removeTodolist}>
          <DeleteIcon/>
        </IconButton>
      </div>
      <AddItemForm addItem={addTask}/>
      {
        tasksForTodolist.map((task) =>
          <Task
            key={task.id}
            todoId={id}
            task={task}
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
