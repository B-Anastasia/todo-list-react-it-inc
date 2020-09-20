import React, {useCallback} from "react";
import AddItemForm from "../AddItemForm/AddItemForm";
import {Grid, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import {FilterValuesType, ITodoListDomenType,} from "../../state/todolists-reducer";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Task} from "../Task/Task";
import {ITaskType, TasksStatuses} from "../../api/tasks-api";

type TodoListPropsType = {
    todolist: ITodoListDomenType
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    onChangeTitleList: (newTitle: string, todoListId: string) => void;
    tasks: Array<ITaskType>;
    removeTask: (id: string, todoListId: string) => void;
    addTask: (val: string, todoListId: string) => void;
    onSaveNewTaskTitle: (newTitle: string, taskId: string, todoListId: string) => void;
    changeStatus: (taskId: string, status: TasksStatuses, todoListID: string) => void;
    removeTodoList: (todoListID: string) => void;
};

export const TodoList = React.memo((props: TodoListPropsType) => {
    console.log("TodoList is called");

    const {id, filter, title} = props.todolist;
    const {onChangeTitleList, removeTodoList, addTask, changeFilter} = props;

    //to filter tasks
    let tasksForTodoList = props.tasks;

    if (filter === "active") {
        tasksForTodoList = tasksForTodoList.filter((el) => el.status === TasksStatuses.New);
    }
    if (filter === "completed") {
        tasksForTodoList = tasksForTodoList.filter((el) => el.status === TasksStatuses.Completed);
    }

    let tasksEls = tasksForTodoList.map((el: ITaskType) => {
        return (
            <Task
                changeTaskStatus={props.changeStatus}
                changeTaskTitle={props.onSaveNewTaskTitle}
                removeTask={props.removeTask}
                task={el}
                todolistId={id}
            />
        );
    });

    const updateTitleTask = useCallback((newTitle) => onChangeTitleList(newTitle, id), [id, onChangeTitleList])

    const removeTodolist = useCallback(() => removeTodoList(id), [removeTodoList, id])

    const createTask = useCallback((val) => addTask(val, id), [addTask, id])

    const onFilterAll = useCallback(() => changeFilter('all', id), [changeFilter, id])

    const onFilterActive = useCallback(() => changeFilter('active', id), [changeFilter, id])

    const onFilterComplete = useCallback(() => changeFilter('completed', id), [changeFilter, id])

    /* const createTaskTitle = useCallback(
        (title: string) => {
            dispatch(addTaskAC(title, props.todolist.id));
        },
        [dispatch, props.todolist.id]
    );

    const onFilterAll = useCallback(() => {
        dispatch(ChangeTodolistFilterAC(props.todolist.id, "all"));
    }, [dispatch, props.todolist.id]);

    const onFilterActive = useCallback(() => {
        dispatch(ChangeTodolistFilterAC(props.todolist.id, "active"));
    }, [dispatch, props.todolist.id]);

    const onFilterCompleted = useCallback(() => {
        dispatch(ChangeTodolistFilterAC(props.todolist.id, "completed"));
    }, [dispatch, props.todolist.id]);

    const onDeleteTodoList = useCallback(() => {
        const action = RemoveTodolistAC(props.todolist.id);
        dispatch(action);
    }, [dispatch, props.todolist.id]);

    const onChangeTitleListHendler = useCallback(
        (newTitle: string) => {
            dispatch(ChangeTodolistTitleAC(props.todolist.id, newTitle));
        },
        [dispatch, props.todolist.id]
    );*/

    return (
        <div>
            <h3>
                <EditableSpan
                    title={title}
                    onSaveTitle={updateTitleTask}
                />
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={createTask}/>
            <div>{tasksEls}</div>
            <Grid container spacing={1}>
                <Grid item>
                    <Button
                        variant={filter === "all" ? "contained" : "outlined"}
                        onClick={onFilterAll}
                        className={filter === "all" ? "active-filter" : ""}
                    >
                        All
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant={filter === "active" ? "contained" : "outlined"}
                        color={"secondary"}
                        onClick={onFilterActive}
                        className={filter === "active" ? "active-filter" : ""}
                    >
                        Active
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant={filter === "completed" ? "contained" : "outlined"}
                        color={"primary"}
                        onClick={onFilterComplete}
                        className={filter === "completed" ? "active-filter" : ""}
                    >
                        Completed
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
});
