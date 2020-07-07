import React, { useState } from "react";
import "./App.css";
import { TodoList } from "./TodoList";
import { v1 } from "uuid";
import AddItemForm from "./AddItemForm";
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

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

//create new type for our few todoLists
type TodoListType = {
  id: string;
  title: string;
  filter: FilterValType;
};

//new type for associative array
type TasksStateType = {
  [key: string]: Array<TaskType>;
};
export type FilterValType = "all" | "active" | "completed";

function App() {
  let todoListID1 = v1();
  let todoListID2 = v1();

  //create new structure of the few todolists
  let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: todoListID1, title: "Books", filter: "all" },
    { id: todoListID2, title: "Songs", filter: "active" },
  ]);

  let [tasks, setTasks] = useState<TasksStateType>({
    [todoListID1]: [
      { id: v1(), title: "MobX", isDone: true },
      { id: v1(), title: "Redux", isDone: false },
    ],
    [todoListID2]: [
      { id: v1(), title: "React", isDone: false },
      { id: v1(), title: "MobX", isDone: true },
      { id: v1(), title: "Redux", isDone: false },
    ],
  });

  // let [filter, setFilter] = useState<FilterValType>("all");

  function removeTask(id: string, todoListId: string) {
    //to find array of tasks by key from parameters
    let todoListTasks = tasks[todoListId];
    //filter array only where not deleted task
    tasks[todoListId] = todoListTasks.filter((el) => el.id !== id);
    //shallow copy
    setTasks({ ...tasks });
  }

  function addTask(val: string, todoListId: string) {
    //create new Task
    let newTask = {
      id: v1(),
      title: val,
      isDone: false,
    };
    //find which todoList want to add new task
    let todoListTasks = tasks[todoListId];
    //change old array by new
    tasks[todoListId] = [newTask, ...todoListTasks];
    //shallow copy
    setTasks({ ...tasks });
  }

  function changeStatus(taskId: string, isDone: boolean, todoListID: string) {
    let todoListTasks = tasks[todoListID];
    let task = todoListTasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasks });
    }
  }

  //add id to the function, change filter value in the todolist.id===id
  function changeFilter(id: string, value: FilterValType) {
    //find first value of the first todoLists where true
    let todoList = todoLists.find((tl) => tl.id === id);
    if (todoList) {
      todoList.filter = value;
      setTodoLists([...todoLists]);
    }
  }

  const onChangeTitleList = (newTitle: string, todoListsId: string) => {
    const todoList = todoLists.find((l) => l.id === todoListsId);
    if (todoList) {
      todoList.title = newTitle;
      setTodoLists([...todoLists]);
    }
    /*    setTodoLists(
              todoLists.map((l) => {
                if (l.id === todoListsId) {
                  return { ...l, title: newTitle };
                }
                return l;
              })
            );*/
  };

  const onSaveNewTaskTitle = (
    newTitle: string,
    taskId: string,
    todoListId: string
  ) => {
    const newTasks = {
      ...tasks,
      [todoListId]: tasks[todoListId].map((t) =>
        t.id === taskId ? { ...t, title: newTitle } : t
      ),
    };
    setTasks(newTasks);

    /*  let todoListTasks = tasks[todoListId];
            let task = todoListTasks.find((t) => t.id === taskId);
            if (task) {
              task.title = newTitle;
              // task = { ...task, title: newTitle };
              setTasks({ ...tasks });
            }*/
  };

  /*
        let tasksForTodoList = tasks;

        if (filter === "active") {
          tasksForTodoList = tasks.filter((el) => !el.isDone);
        }
        if (filter === "completed") {
          tasksForTodoList = tasks.filter((el) => el.isDone);
        }*/

  //remove todoList
  function removeTodoList(todoListID: string) {
    //deleting todolists
    setTodoLists(todoLists.filter((tl) => tl.id !== todoListID));
    //deleting from object tasks property with key todoListID
    delete tasks[todoListID];
    setTasks({ ...tasks });
  }

  //add new TodoList
  function addTodoList(title: string) {
    //common id for tasks[] and todolist
    let newTodoListId: string = v1();

    let newTodoList: TodoListType = {
      id: newTodoListId,
      title: title,
      filter: "all",
    };
    setTodoLists([newTodoList, ...todoLists]);
    //added new array of tasks for idtodolist
    setTasks({ ...tasks, [newTodoListId]: [] });
  }

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
            // before return the list we need to filter it
            let tasksForTodoList = tasks[tl.id];

            if (tl.filter === "active") {
              tasksForTodoList = tasksForTodoList.filter((el) => !el.isDone);
            }
            if (tl.filter === "completed") {
              tasksForTodoList = tasksForTodoList.filter((el) => el.isDone);
            }
            return (
              <Grid item key={tl.id}>
                <Paper elevation={3} style={{ padding: "10px" }}>
                  <TodoList
                    onChangeTitleList={onChangeTitleList}
                    id={tl.id}
                    tasks={tasksForTodoList}
                    title={tl.title}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeStatus={changeStatus}
                    filter={tl.filter}
                    removeTodoList={removeTodoList}
                    onSaveNewTaskTitle={onSaveNewTaskTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* <TodoList
        tasks={tasksForTodoList}
        title={"What to learn"}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeStatus={changeStatus}
        filter={filter}
      />*/}
    </div>
  );
}

export default App;
