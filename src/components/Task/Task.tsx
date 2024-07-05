import {memo} from "react";
import styles from "./Task.module.scss";
import {TaskPropsType} from "@/components/Task/types";

export const Task = memo((props: TaskPropsType) => {
  const {title, isDone} = props;

  return (
    <div>
      <input type="checkbox" checked={isDone} onChange={() => {
      }}/>
      <span>{title}</span>
    </div>
  );
});
