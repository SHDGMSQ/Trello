import {memo} from "react";
import {Task} from "@/components/Task/Task";
import styles from "./Todolist.module.scss"
import {TodolistPropsType} from "@/components/Todolist/types";
import {AddItemForm} from "@/components/AddItemForm/AddItemForm";

export const Todolist = memo((props: TodolistPropsType) => {
  const {title, tasks} = props;

  return (
    <div className={styles.container}>
      <div className={styles.todoHeader}>
        <h3>{title}</h3>
        <button>x</button>
      </div>
     <AddItemForm addItem={() => {}}/>
      {
        tasks.map((task) =>
          <Task
            key={task.id}
            title={task.title}
            isDone={task.isDone}
          />
        )
      }
      <div className={styles.btnsContainer}>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  );
});
