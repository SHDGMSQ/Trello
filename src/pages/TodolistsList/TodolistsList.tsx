import {memo} from "react";
import {Grid, Paper} from "@mui/material";
import {Todolist} from "@/components/Todolist/Todolist";
import {TodolistsListPropsType} from "@/pages/TodolistsList/types";

export const TodolistsList = memo((props: TodolistsListPropsType) => {
  const {todolists, tasks} = props;
  return (
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
                  filter={tl.filter}
                />
              </Paper>
            </Grid>
          )
        }
      </Grid>
    </div>
  )
});