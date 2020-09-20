import React, {useCallback, useReducer} from "react";
import "../../App.css";
import {TodoList} from "../Todolist/TodoList";
import {v1} from "uuid";
import AddItemForm from "../AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography,} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    FilterValuesType,
    RemoveTodolistAC,
    todolistsReducer
} from "../../state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "../../state/tasks-reducer";
import {TasksPriorities, TasksStatuses} from "../../api/tasks-api";

function AppWithHookReducer() {
    let todoListID1 = v1();
    let todoListID2 = v1();

    //create new structure of the few todolists
    let [todoLists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todoListID1, title: "Books", filter: "all", order: 0, addedDate: ''},
        {id: todoListID2, title: "Songs", filter: "active", order: 0, addedDate: ''},
    ]);

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListID1]: [
            {
                id: v1(),
                title: "MobX",
                todoListId: todoListID1,
                status: TasksStatuses.Completed,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TasksPriorities.Low,
                completed: true,
                description: '',
            },
            {
                id: v1(),
                title: "Redux",
                todoListId: todoListID1,
                status: TasksStatuses.New,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TasksPriorities.Low,
                completed: true,
                description: '',
            },
        ],
        [todoListID2]: [
            {
                id: v1(),
                title: "React",
                todoListId: todoListID2,
                status: TasksStatuses.Completed,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TasksPriorities.Low,
                completed: true,
                description: '',
            },
            {
                id: v1(),
                title: "MobX",
                todoListId: todoListID2,
                status: TasksStatuses.Completed,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TasksPriorities.Low,
                completed: true,
                description: '',
            },
            {
                id: v1(),
                title: "Redux",
                todoListId: todoListID2,
                status: TasksStatuses.Completed,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TasksPriorities.Low,
                completed: true,
                description: '',
            },
        ],
    });

    const removeTask = useCallback((id: string, todoListId: string) => {
        const action = removeTaskAC(id, todoListId);
        dispatchToTasks(action);
    }, [dispatchToTasks])

    const addTask = useCallback((val: string, todoListId: string) => {
        const action = addTaskAC(val, todoListId);
        dispatchToTasks(action);
    }, [dispatchToTasks])

    const changeStatus = useCallback((taskId: string, status: TasksStatuses, todoListID: string) => {
        const action = changeTaskStatusAC(taskId, status, todoListID);
        dispatchToTasks(action);
    }, [dispatchToTasks])

    const onSaveNewTaskTitle = useCallback((
        newTitle: string,
        taskId: string,
        todoListId: string
    ) => {
        dispatchToTasks(changeTaskTitleAC(taskId, newTitle, todoListId));
    }, [dispatchToTasks]);

    //add id to the function, change filter value in the todolist.id===id
    const changeFilter = useCallback((filter: FilterValuesType, todolistId: string) => {
        dispatchToTodolists(ChangeTodolistFilterAC(filter,todolistId));
    }, [dispatchToTodolists])

    const onChangeTitleList = useCallback((newTitle: string, todoListsId: string) => {
        dispatchToTodolists(ChangeTodolistTitleAC(todoListsId, newTitle));
    }, [dispatchToTodolists])

    const removeTodoList = useCallback((todoListID: string) => {
        const action = RemoveTodolistAC(todoListID);
        dispatchToTodolists(action);
        dispatchToTasks(action);
    }, [dispatchToTasks, dispatchToTodolists])

    //add new TodoList
    const addTodoList = useCallback((title: string) => {
        const action = AddTodolistAC(title);
        dispatchToTodolists(action);
        dispatchToTasks(action);
    }, [dispatchToTodolists, dispatchToTasks])

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
                                    <TodoList
                                        todolist={tl}
                                        tasks={tasks[tl.id]}
                                        onChangeTitleList={onChangeTitleList}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeStatus={changeStatus}
                                        removeTodoList={removeTodoList}
                                        onSaveNewTaskTitle={onSaveNewTaskTitle}
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
