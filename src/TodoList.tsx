import React, { ChangeEvent } from "react";
import { FilterValuesType, TaskType } from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import { Checkbox, Grid, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import Button from "@material-ui/core/Button";

type TodoListPropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string, todoListId: string) => void;
  changeFilter: (id: string, value: FilterValuesType) => void;
  addTask: (val: string, todoListId: string) => void;
  changeStatus: (taskId: string, isDone: boolean, todoListID: string) => void;
  filter: FilterValuesType;
  removeTodoList: (todoListID: string) => void;
  onSaveNewTaskTitle: (
    newTitle: string,
    taskId: string,
    todoListId: string
  ) => void;
  onChangeTitleList: (newTitle: string, todoListId: string) => void;
};

export function TodoList(props: TodoListPropsType) {
  const {
    title,
    tasks,
    removeTask,
    changeFilter,
    changeStatus,
    filter,
    removeTodoList,
  } = props;

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

  let tasksEls = tasks.map((el: TaskType) => {
    const onRemoveTask = () => removeTask(el.id, props.id);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      let newIsDone = e.currentTarget.checked; //new value checked for checked task
      changeStatus(el.id, newIsDone, props.id);
    };
    const changeT = (newTitle: string) => {
      props.onSaveNewTaskTitle(newTitle, el.id, props.id);
    };
    return (
      <div
        key={el.id}
        className={filter === "all" && el.isDone ? "is-done" : ""}
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
    props.addTask(title, props.id);
  };

  const onDeleteTodoList = () => removeTodoList(props.id);

  const onFilterAll = () => changeFilter(props.id, "all");
  const onFilterActive = () => changeFilter(props.id, "active");
  const onFilterCompleted = () => changeFilter(props.id, "completed");
  const onChangeTitleListHendler = (newTitle: string) =>
    props.onChangeTitleList(newTitle, props.id);
  return (
    <div>
      <h3>
        <EditableSpan
          title={title}
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
            onClick={onFilterCompleted}
            className={filter === "completed" ? "active-filter" : ""}
          >
            Completed
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
