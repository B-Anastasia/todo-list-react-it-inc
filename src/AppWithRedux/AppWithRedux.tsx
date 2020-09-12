import React, { useCallback } from "react";
import "../App.css";
import { TodoList } from "../TodoList";
import AddItemForm from "../AddItemForm/AddItemForm";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Container,
  Grid,
  Paper,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { AddTodolistAC } from "../state/todolists-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../state/store";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

//create new type for our few todoLists
export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

//new type for associative array
export type TasksStateType = {
  [key: string]: Array<TaskType>;
};
export type FilterValuesType = "all" | "active" | "completed";

function AppWithRedux() {
  let todoLists = useSelector<AppRootStateType, Array<TodolistType>>(
    (state) => state.todolists
  );
  let dispatch = useDispatch();

  //add new TodoList
  const addTodoList = useCallback(
    (title: string) => {
      const action = AddTodolistAC(title);
      dispatch(action);
    },
    [dispatch]
  );

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm addItem={addTodoList} />
        </Grid>
        {/*to render our few TodoList we need to use .map function*/}
        <Grid container spacing={3}>
          {todoLists.map((tl) => {
            return (
              <Grid item key={tl.id}>
                <Paper elevation={3} style={{ padding: "10px" }}>
                  <TodoList todolist={tl} />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithRedux;
