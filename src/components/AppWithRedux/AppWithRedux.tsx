import React, {useCallback} from "react";
import "../../App.css";
import AddItemForm from "../AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography,} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    FilterValuesType,
    ITodoListDomenType,
    RemoveTodolistAC
} from "../../state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {TodoList} from "../Todolist/TodoList";
import {TasksStateType, TasksStatuses} from "../../api/tasks-api";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../state/tasks-reducer";

function AppWithRedux() {
    let todoLists = useSelector<AppRootStateType, Array<ITodoListDomenType>>(
        (state) => state.todolists
    );
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    let dispatch = useDispatch();

    //add new TodoList
    const addTodoList = useCallback((title: string) => {
            dispatch(AddTodolistAC(title));
        },
        [dispatch]
    );

    const changeFilter = useCallback((filter: FilterValuesType, todolistId: string) => {
        dispatch(ChangeTodolistFilterAC(filter, todolistId))
    }, [dispatch])

    const onChangeTitleList = useCallback((todolistId: string, title: string) => {
        dispatch(ChangeTodolistTitleAC(todolistId, title))
    }, [dispatch])

    const removeTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(removeTaskAC(taskId, todolistId))
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId))
    }, [dispatch])

    const onSaveNewTaskTitle = useCallback((id: string, title: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(id, title, todolistId))
    }, [dispatch])


    const changeTaskStatus = useCallback((id: string, status: TasksStatuses, todolistId: string) => {
        dispatch(changeTaskStatusAC(id, status, todolistId))
    }, [dispatch])


    const removeTodoList = useCallback((todolistId: string) => {
        dispatch(RemoveTodolistAC(todolistId))
    }, [dispatch])


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
                        return (
                            <Grid item key={tl.id}>
                                <Paper elevation={3} style={{padding: "10px"}}>
                                    <TodoList todolist={tl}
                                              changeFilter={changeFilter}
                                              onChangeTitleList={onChangeTitleList}
                                              tasks={tasks[tl.id]}
                                              removeTask={removeTask}
                                              addTask={addTask}
                                              onSaveNewTaskTitle={onSaveNewTaskTitle}
                                              changeStatus={changeTaskStatus}
                                              removeTodoList={removeTodoList}
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

export default AppWithRedux;
