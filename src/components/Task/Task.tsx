import {ChangeEvent, memo, useCallback} from "react";
import styles from "./Task.module.scss";
import {TaskPropsType} from "@/components/Task/types";
import {EditableSpan} from "@/components/EditableSpan/EditableSpan";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import {IconButton} from "@mui/material";

export const Task = memo((props: TaskPropsType) => {
  const {task, changeTaskStatus, todoId, removeTask, changeTaskTitle} = props;

  const onChangeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    changeTaskStatus(todoId, task.id, e.currentTarget.checked);
  }, [changeTaskStatus, todoId, task.id]);

  const removeTaskHandler = useCallback(() => {
    removeTask(todoId, task.id);
  }, [removeTask, todoId, task.id]);

  const changeTitle = useCallback((title: string) => {
    changeTaskTitle(task.id, title);
  }, [changeTaskTitle, task.id]);

  return (
    <div className={styles.container}>
      <div>
        <Checkbox checked={task.isDone} onChange={onChangeTaskStatusHandler} color="primary"/>
        <EditableSpan title={task.title} changeTitle={changeTitle}/>
      </div>
      <IconButton aria-label="delete" color="primary" onClick={removeTaskHandler}>
        <DeleteIcon/>
      </IconButton>
    </div>
  );
});
