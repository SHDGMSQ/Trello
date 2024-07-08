import {ChangeEvent, memo, useCallback} from "react";
import styles from "./Task.module.scss";
import {TaskPropsType} from "@/components/Task/types";
import {EditableSpan} from "@/components/EditableSpan/EditableSpan";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import {IconButton} from "@mui/material";

export const Task = memo((props: TaskPropsType) => {
  const {title, isDone, id, changeTaskStatus, todoId, removeTask, changeTaskTitle} = props;

  const onChangeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    changeTaskStatus(todoId, id, e.currentTarget.checked);
  }, [changeTaskStatus, todoId, id]);

  const removeTaskHandler = useCallback(() => {
    removeTask(todoId, id);
  }, [removeTask, todoId, id]);

  const changeTitle = useCallback((title: string) => {
    changeTaskTitle(id, title);
  }, [changeTaskTitle, id]);

  return (
    <div className={styles.container}>
      <div>
        <Checkbox checked={isDone} onChange={onChangeTaskStatusHandler} color="primary"/>
        <EditableSpan title={title} changeTitle={changeTitle}/>
      </div>
      <IconButton aria-label="delete" color="primary" onClick={removeTaskHandler}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
});
