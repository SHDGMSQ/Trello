import {memo, useCallback} from "react";
import {Task} from "@/components/Task/Task";
import styles from "./Todolist.module.scss";
import {TodolistPropsType} from "@/components/Todolist/types";
import {AddItemForm} from "@/components/AddItemForm/AddItemForm";

export const Todolist = memo((props: TodolistPropsType) => {
  const {id, title, tasks, removeTodolist, addTask, changeTaskStatus, changeTasks, filter, removeTask} = props;

  const removeTodolistHandler = useCallback(() => {
    removeTodolist(id);
  }, [removeTodolist, id]);

  const addTaskHandler = useCallback((title: string) => {
    addTask(id, title);
  }, [addTask, id]);

  const onAllClickHandler = useCallback(() => {
    changeTasks(id, "All");
  }, [changeTasks, id]);
  const onActiveClickHandler = useCallback(() => {
    changeTasks(id, "Active");
  }, [changeTasks, id]);
  const onCompletedClickHandler = useCallback(() => {
    changeTasks(id, "Completed");
  }, [changeTasks, id]);

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
        <h3>{title}</h3>
        <button onClick={removeTodolistHandler}>x</button>
      </div>
      <AddItemForm addItem={addTaskHandler}/>
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
          />
        )
      }
      <div className={styles.btnsContainer}>
        <button onClick={onAllClickHandler} className={`${filter === "All" ? styles.chosenButton : ""}`}>All</button>
        <button onClick={onActiveClickHandler} className={`${filter === "Active" ? styles.chosenButton : ""}`}>Active</button>
        <button onClick={onCompletedClickHandler} className={`${filter === "Completed" ? styles.chosenButton : ""}`}>Completed</button>
      </div>
    </div>
  );
});
