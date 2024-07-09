import {memo} from "react";
import styles from "./Task.module.scss";
import {TaskPropsType} from "@/components/Task/types";
import {EditableSpan} from "@/components/EditableSpan/EditableSpan";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import {IconButton} from "@mui/material";
import {useTask} from "@/components/Task/hooks/useTask";

export const Task = memo((props: TaskPropsType) => {

  const {
    changeTaskTitle,
    changeTaskStatus,
    removeTask,
    task
  } = useTask(props);


  return (
    <div className={styles.container}>
      <div>
        <Checkbox checked={task.isDone} onChange={changeTaskStatus} color="primary"/>
        <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
      </div>
      <IconButton aria-label="delete" color="primary" onClick={removeTask}>
        <DeleteIcon/>
      </IconButton>
    </div>
  );
});
