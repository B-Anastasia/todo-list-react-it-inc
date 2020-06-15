import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { FilterValType, TaskType } from "./App";

type TodoListPropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValType) => void;
  addTask: (val: string) => void;
  changeStatus: (taskId: string, isDone: boolean) => void;
  filter: FilterValType;
};

export function TodoList(props: TodoListPropsType) {
  const {
    title,
    tasks,
    removeTask,
    changeFilter,
    addTask,
    changeStatus,
    filter,
  } = props;

  let [val, setVal] = useState<string>("");
  let [error, setError] = useState<string | null>(null);

  let tasksEls = tasks.map((el: TaskType) => {
    const onRemoveTask = () => removeTask(el.id);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      let newIsDone = e.currentTarget.checked; //new value checked for checked task
      changeStatus(el.id, newIsDone);
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
  const addNewTask = () => {
    if (val.trim() !== "") {
      addTask(val);
    } else {
      setError("Title is required");
    }
    setVal("");
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setVal(e.currentTarget.value);
  };
  const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setError(null);
    setVal(e.currentTarget.value);
  };

  const onClickNewLine = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.altKey) {
      addNewTask();
    } else if (e.key === "Enter") {
      setVal(`${val}\r\n`);
    }
  };

  const onKeyPressAdd = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);

    if (e.charCode === 13) {
      addNewTask();
    }
    // console.log(e.charCode);
  };

  const onFilterAll = () => changeFilter("all");
  const onFilterActive = () => changeFilter("active");
  const onFilterCompleted = () => changeFilter("completed");

  return (
    <div>
      <h3>{title}</h3>
      <div>
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
      </div>
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
