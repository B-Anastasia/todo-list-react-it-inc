import React, {useReducer} from "react";
import "./App.css";
import {TodoList} from "./TodoList";
import {v1} from "uuid";
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
import {Menu} from "@material-ui/icons";
import {AddTodolistAC} from "./state/todolists-reducer";
import {tasksReducer} from "./state/tasks-reducer";

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

function AppWithHookReducer() {
    let todoListID1 = v1();
    let todoListID2 = v1();

    //create new structure of the few todolists
    let [todoLists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todoListID1, title: "Books", filter: "all"},
        {id: todoListID2, title: "Songs", filter: "active"},
    ]);

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListID1]: [
            {id: v1(), title: "MobX", isDone: true},
            {id: v1(), title: "Redux", isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "MobX", isDone: true},
            {id: v1(), title: "Redux", isDone: false},
        ],
    });

    /*  function removeTask(id: string, todoListId: string) {
      const action = removeTaskAC(id, todoListId);
      dispatchToTasks(action);
    }

    function addTask(val: string, todoListId: string) {
      const action = addTaskAC(val, todoListId);
      dispatchToTasks(action);
    }

    function changeStatus(taskId: string, isDone: boolean, todoListID: string) {
      const action = changeTaskStatusAC(taskId, isDone, todoListID);
      dispatchToTasks(action);
    }

    const onSaveNewTaskTitle = (
      newTitle: string,
      taskId: string,
      todoListId: string
    ) => {
      dispatchToTasks(changeTaskTitleAC(taskId, newTitle, todoListId));
    };

    //add id to the function, change filter value in the todolist.id===id
    function changeFilter(id: string, value: FilterValuesType) {
      dispatchToTodolists(ChangeTodolistFilterAC(id, value));
    }

    const onChangeTitleList = (newTitle: string, todoListsId: string) => {
      dispatchToTodolists(ChangeTodolistTitleAC(todoListsId, newTitle));
    };

    function removeTodoList(todoListID: string) {
      const action = RemoveTodolistAC(todoListID);
      dispatchToTodolists(action);
      dispatchToTasks(action);
    }*/

    //add new TodoList
    function addTodoList(title: string) {
        const action = AddTodolistAC(title);
        dispatchToTodolists(action);
        dispatchToTasks(action);
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">News</Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
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
                                <Paper elevation={3} style={{padding: "10px"}}>
                                    <TodoList
                                        todolist={tl}
                                        /*        onChangeTitleList={onChangeTitleList}
                                        id={tl.id}
                                        tasks={tasksForTodoList}
                                        title={tl.title}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodoList={removeTodoList}
                                        onSaveNewTaskTitle={onSaveNewTaskTitle}*/
                                    />
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithHookReducer;
