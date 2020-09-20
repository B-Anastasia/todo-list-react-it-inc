import React, {useCallback, useState} from "react";
import "../App.css";
import {TodoList} from "../TodoList";
import {v1} from "uuid";
import AddItemForm from "../AddItemForm/AddItemForm";
import {Menu} from "@material-ui/icons";
import {FilterValuesType, ITodoListDomenType} from "../state/todolists-reducer";
import {TasksPriorities, TasksStateType, TasksStatuses} from "../api/tasks-api";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography,} from "@material-ui/core";

function App() {
    let todoListID1 = v1();
    let todoListID2 = v1();

    //create new structure of the few todolists
    let [todoLists, setTodoLists] = useState<Array<ITodoListDomenType>>([
        {id: todoListID1, title: "Books", filter: "all", order: 0, addedDate: ''},
        {id: todoListID2, title: "Songs", filter: "active", order: 0, addedDate: ''},
    ]);

    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListID1]: [
            {
                id: v1(),
                title: "CSS",
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
                title: "HTML",
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
                status: TasksStatuses.New,
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

    //change todolist filter
    function changeFilter(filter: FilterValuesType, todolistId: string) {
        setTodoLists(todoLists.map(tl => tl.id === todolistId ? {...tl, filter} : tl))
    }

    //update todolist title
    const onChangeTitleList = (newTitle: string, todoListsId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListsId ? {...tl, title: newTitle} : tl))
    };

    //add new TodoList
    const addTodoList = useCallback((title: string) => {
        //common id for tasks[] and todolist
        let newTodoListId: string = v1();

        let newTodoList: ITodoListDomenType = {
            id: newTodoListId,
            title: title,
            filter: "all",
            addedDate: '',
            order: 0
        };
        setTodoLists([newTodoList, ...todoLists]);
        //added new array of tasks for id todolist
        setTasks({...tasks, [newTodoListId]: []});
    }, [tasks, todoLists]);

    //remove todoList
    function removeTodoList(todoListID: string) {
        //deleting todolists
        setTodoLists(todoLists.filter((tl) => tl.id !== todoListID));
        //deleting from object tasks property with key todoListID
        delete tasks[todoListID];
        setTasks({...tasks});
    }

    //delete task
    function removeTask(id: string, todoListId: string) {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].filter(t => t.id !== id)
        })
    }

    //add task
    function addTask(val: string, todoListId: string) {
        //create new Task
        let newTask = {
            id: v1(),
            title: val,
            todoListId: todoListId,
            status: TasksStatuses.New,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TasksPriorities.Low,
            completed: true,
            description: '',
        };
        setTasks({
            ...tasks,
            [todoListId]: [newTask, ...tasks[todoListId]]
        });
    }

    //change task status
    function changeStatus(taskId: string, status: TasksStatuses, todoListID: string) {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t => (t.id === taskId) ? {...t, status} : t)
        })
    }

    //update task title
    const onSaveNewTaskTitle = (newTitle: string, taskId: string, todoListId: string) => {
        const newTasks = {
            ...tasks,
            [todoListId]: tasks[todoListId].map((t) =>
                t.id === taskId ? {...t, title: newTitle} : t
            ),
        };
        setTasks(newTasks);
    };

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

export default App;
