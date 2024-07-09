import {Todolist} from "@/components/Todolist/Todolist";
import {AddItemForm} from "@/components/AddItemForm/AddItemForm";
import {Box, Grid, Paper} from "@mui/material";
import {useApp} from "@/app/hooks/useApp";

export const App = () => {

  const {todolists, removeTodolist, addTodolist, changeTodolistTitle, changeFilter, tasks} = useApp();

  return (
    <Box>
      <Grid container padding={2}>
        <AddItemForm addItem={addTodolist}/>
      </Grid>
      <div>
        <Grid container spacing={4} padding={2}>
          {
            todolists.map((tl) =>
              <Grid key={tl.id} item>
                <Paper elevation={3}>
                  <Todolist
                    id={tl.id}
                    tasks={tasks[tl.id]}
                    title={tl.title}
                    removeTodolist={removeTodolist}
                    changeFilter={changeFilter}
                    filter={tl.filter}
                    changeTodoTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            )
          }
        </Grid>
      </div>
    </Box>
  );
};