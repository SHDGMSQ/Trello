import styles from "./App.module.scss";
import {v4 as uuidv4} from "uuid";
import {Todolist} from "@/components/Todolist/Todolist";
import {useState} from "react";
import {TodolistType} from "@/components/Todolist/types";
import {TasksType} from "@/components/Task/types";
import {AddItemForm} from "@/components/AddItemForm/AddItemForm";

export const App = () => {
  const todoId1 = uuidv4();
  const todoId2 = uuidv4();

  const [todolists, setTodolists] = useState<Array<TodolistType>>([
    {id: todoId1, title: "First"},
    {id: todoId2, title: "Second"},
  ]);

  const [tasks, setTasks] = useState<TasksType>({
    [todoId1]: [
      {id: uuidv4(), title: "first task1", isDone: true,},
      {id: uuidv4(), title: "second task1", isDone: true,},
      {id: uuidv4(), title: "third task1", isDone: false,},
    ],
    [todoId2]: [
      {id: uuidv4(), title: "first task2", isDone: false,},
      {id: uuidv4(), title: "second task2", isDone: false,},
      {id: uuidv4(), title: "third task2", isDone: false,},
    ]
  });

  const addTodolist = (title: string) => {
    const todoId = uuidv4();
    setTodolists([{id: todoId, title}, ...todolists]);
    setTasks({...tasks, [todoId]: []});
  };

  const removeTodolist = () => {

  };


  return (
    <div className={styles.container}>
      <AddItemForm addItem={addTodolist}/>
      <div className={styles.todolists}>
        {
          todolists.map((tl) =>
            <Todolist
              id={tl.id}
              key={tl.id}
              title={tl.title}
              tasks={tasks[tl.id]}
            />
          )
        }
      </div>
    </div>
  );
};