import {Grid, Paper} from "@mui/material";
import {Todolist} from "@/components/Todolist/Todolist";
import {useTodolistsList} from "@/pages/TodolistsList/hooks/useTodolistsList";
import {AddItemForm} from "@/components/AddItemForm/AddItemForm";

export const TodolistsList = () => {
  const {todolists, tasks, addTodolist} = useTodolistsList();
  return (
    <div>
      <Grid container padding={2}>
        <AddItemForm addItem={addTodolist}/>
      </Grid>
      <Grid container spacing={4} padding={2}>
        {
          todolists.map((tl) =>
            <Grid key={tl.id} item>
              <Paper elevation={3}>
                <Todolist
                  id={tl.id}
                  tasks={tasks[tl.id]}
                  title={tl.title}
                  filter={tl.filter}
                  entityStatus={tl.entityStatus}
                />
              </Paper>
            </Grid>
          )
        }
      </Grid>
    </div>
  );
};