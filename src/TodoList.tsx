import React, { ChangeEvent } from "react";
import { FilterValType, TaskType } from "./App";
import AddItemForm from "./AddItemForm";

type TodoListPropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string, todoListId: string) => void;
  changeFilter: (id: string, value: FilterValType) => void;
  addTask: (val: string, todoListId: string) => void;
  changeStatus: (taskId: string, isDone: boolean, todoListID: string) => void;
  filter: FilterValType;
  removeTodoList: (todoListID: string) => void;
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
    return (
      <li
        key={el.id}
        className={filter === "all" && el.isDone ? "is-done" : ""}
      >
        <input type="checkbox" checked={el.isDone} onChange={onChangeHandler} />
        <span>{el.title}</span>
        <button onClick={onRemoveTask}>x</button>
      </li>
    );
  });

  const createTaskTitle = (title: string) => {
    props.addTask(title, props.id);
  };

  const onDeleteTodoList = () => removeTodoList(props.id);

  const onFilterAll = () => changeFilter(props.id, "all");
  const onFilterActive = () => changeFilter(props.id, "active");
  const onFilterCompleted = () => changeFilter(props.id, "completed");

  return (
    <div>
      <h3>
        {title}
        <button onClick={onDeleteTodoList}>x</button>
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
      <ul>{tasksEls}</ul>
      <div>
        <button
          onClick={onFilterAll}
          className={filter === "all" ? "active-filter" : ""}
        >
          All
        </button>
        <button
          onClick={onFilterActive}
          className={filter === "active" ? "active-filter" : ""}
        >
          Active
        </button>
        <button
          onClick={onFilterCompleted}
          className={filter === "completed" ? "active-filter" : ""}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
