import {ChangeEvent, memo, useCallback} from "react";
import styles from "./Task.module.scss";
import {TaskPropsType} from "@/components/Task/types";

export const Task = memo((props: TaskPropsType) => {
  const {title, isDone, id, changeTaskStatus, todoId, removeTask} = props;

  const onChangeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    changeTaskStatus(todoId, id, e.currentTarget.checked);
  }, [changeTaskStatus, todoId, id])

  const removeTaskHandler = useCallback(() => {
    removeTask(todoId, id);
  }, [removeTask, todoId, id]);

  return (
    <div className={styles.container}>
      <div>
        <input type="checkbox" checked={isDone} onChange={onChangeTaskStatusHandler}/>
        <span>{title}</span>
      </div>
      <button onClick={removeTaskHandler}>x</button>
    </div>
  );
});
