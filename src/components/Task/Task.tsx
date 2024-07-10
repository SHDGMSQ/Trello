import {memo} from "react";
import styles from "./Task.module.scss";
import {TaskPropsType} from "@/components/Task/types";
import {EditableSpan} from "@/components/EditableSpan/EditableSpan";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import {IconButton} from "@mui/material";
import {useTask} from "@/components/Task/hooks/useTask";
import {TaskStatuses} from "@/api/types";

export const Task = memo((props: TaskPropsType) => {

  const {
    changeTaskTitle,
    changeTaskStatus,
    removeTask,
    task,
    todoEntityStatus
  } = useTask(props);


  return (
    <div className={styles.container}>
      <div>
        <Checkbox checked={task.status === TaskStatuses.Completed} onChange={changeTaskStatus} color="primary" disabled={todoEntityStatus === "loading"}/>
        <EditableSpan title={task.title} changeTitle={changeTaskTitle} disabled={todoEntityStatus === "loading"}/>
      </div>
      <IconButton aria-label="delete" color="primary" onClick={removeTask} disabled={todoEntityStatus === "loading"}>
        <DeleteIcon/>
      </IconButton>
    </div>
  );
});
