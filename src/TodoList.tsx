import React, { ChangeEvent } from "react";
import { FilterValuesType, TaskType } from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import { Checkbox, Grid, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";
// import { TasksStateType, TodolistType } from "./AppWithRedux";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "./state/tasks-reducer";
import {
  ChangeTodolistFilterAC,
  ChangeTodolistTitleAC,
  RemoveTodolistAC,
} from "./state/todolists-reducer";
import { TodolistType } from "./AppWithHookReducer";

type TodoListPropsType = {
  todolist: TodolistType;
  id?: string;
  title?: string;
  filter?: FilterValuesType;
  onChangeTitleList?: (newTitle: string, todoListId: string) => void;
  tasks?: Array<TaskType>;
  removeTask?: (id: string, todoListId: string) => void;
  addTask?: (val: string, todoListId: string) => void;
  onSaveNewTaskTitle?: (
    newTitle: string,
    taskId: string,
    todoListId: string
  ) => void;
  changeStatus?: (taskId: string, isDone: boolean, todoListID: string) => void;
  changeFilter?: (id: string, value: FilterValuesType) => void;
  removeTodoList?: (todoListID: string) => void;
};

export function TodoList(props: TodoListPropsType) {
  // let todoLists = useSelector<AppRootStateType, TodolistType>(
  //   (state) => state.todolists && todoLists.find((t) => t.id === props.id)
  // );
  let tasks = useSelector<AppRootStateType, Array<TaskType>>(
    (state) => state.tasks[props.todolist.id]
  );
  let dispatch = useDispatch();

  //to filter tasks
  let tasksForTodoList = tasks;

  if (props.todolist.filter === "active") {
    tasksForTodoList = tasksForTodoList.filter((el) => !el.isDone);
  }
  if (props.todolist.filter === "completed") {
    tasksForTodoList = tasksForTodoList.filter((el) => el.isDone);
  }

  /*  let [val, setVal] = useState<string>("");
      let [error, setError] = useState<string | null>(null);*/

  /*  const addNewTask = () => {
        if (val.trim() !== "") {
          addTask(val, props.id);
        } else {
          setError("Title is required");
        }
        setVal("");
      };*/

  /*  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setVal(e.currentTarget.value);
      };
      const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setError(null);
        setVal(e.currentTarget.value);
      };*/

  /*  const onClickNewLine = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && e.altKey) {
          addNewTask();
        } else if (e.key === "Enter") {
          setVal(`${val}\r\n`);
        }
      };*/

  /* const onKeyPressAdd = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);

        if (e.charCode === 13) {
          addNewTask();
        }
        // console.log(e.charCode);
      };*/

  let tasksEls = tasksForTodoList.map((el: TaskType) => {
    const onRemoveTask = () => dispatch(removeTaskAC(el.id, props.todolist.id));

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      let newIsDone = e.currentTarget.checked; //new value checked for checked task
      dispatch(changeTaskStatusAC(el.id, newIsDone, props.todolist.id));
    };

    const changeT = (newTitle: string) => {
      dispatch(changeTaskTitleAC(el.id, newTitle, props.todolist.id));
    };

    return (
      <div
        key={el.id}
        className={
          props.todolist.filter === "all" && el.isDone ? "is-done" : ""
        }
      >
        <Checkbox
          checked={el.isDone}
          onChange={onChangeHandler}
          color={"primary"}
        />
        {/*<input type="checkbox" checked={el.isDone} onChange={onChangeHandler} />*/}
        <EditableSpan title={el.title} onSaveTitle={changeT} />
        {/*<button onClick={onRemoveTask}>x</button>*/}
        <IconButton onClick={onRemoveTask}>
          <Delete />
        </IconButton>
      </div>
    );
  });

  const createTaskTitle = (title: string) => {
    dispatch(addTaskAC(title, props.todolist.id));
  };

  const onFilterAll = () =>
    dispatch(ChangeTodolistFilterAC(props.todolist.id, "all"));

  const onFilterActive = () =>
    dispatch(ChangeTodolistFilterAC(props.todolist.id, "active"));

  const onFilterCompleted = () =>
    dispatch(ChangeTodolistFilterAC(props.todolist.id, "completed"));

  const onDeleteTodoList = () => {
    const action = RemoveTodolistAC(props.todolist.id);
    dispatch(action);
  };

  const onChangeTitleListHendler = (newTitle: string) =>
    dispatch(ChangeTodolistTitleAC(props.todolist.id, newTitle));

  return (
    <div>
      <h3>
        <EditableSpan
          title={props.todolist.title}
          onSaveTitle={(newTitle) => onChangeTitleListHendler(newTitle)}
        />
        {/*<button onClick={onDeleteTodoList}>x</button>*/}
        <IconButton onClick={onDeleteTodoList}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={createTaskTitle} />
      {/*<div>
           <textarea onChange={onChangeText} value={val} onKeyUp={onClickNewLine}>
          {val}
        </textarea>
        <input
          type="text"
          value={val}
          onChange={onChangeInput}
          onKeyPress={onKeyPressAdd}
          onFocus={() => setError(null)}
          className={error ? "error" : ""}
        />
        {error && <div className={"error-message"}>{error}</div>}
        <button onClick={addNewTask}>+</button>
      </div>*/}
      <div>{tasksEls}</div>
      <Grid container spacing={1}>
        <Grid item>
          <Button
            variant={props.todolist.filter === "all" ? "contained" : "outlined"}
            onClick={onFilterAll}
            className={props.todolist.filter === "all" ? "active-filter" : ""}
          >
            All
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant={
              props.todolist.filter === "active" ? "contained" : "outlined"
            }
            color={"secondary"}
            onClick={onFilterActive}
            className={
              props.todolist.filter === "active" ? "active-filter" : ""
            }
          >
            Active
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant={
              props.todolist.filter === "completed" ? "contained" : "outlined"
            }
            color={"primary"}
            onClick={onFilterCompleted}
            className={
              props.todolist.filter === "completed" ? "active-filter" : ""
            }
          >
            Completed
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
