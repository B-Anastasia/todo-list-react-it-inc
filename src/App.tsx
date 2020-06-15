import React, { useState } from "react";
import "./App.css";
import { TodoList } from "./TodoList";
import { v1 } from "uuid";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterValType = "all" | "active" | "completed";

function App() {
  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "React", isDone: false },
    { id: v1(), title: "MobX", isDone: false },
    { id: v1(), title: "Redux", isDone: false },
  ]);

  let [filter, setFilter] = useState<FilterValType>("all");

  function removeTask(id: string) {
    let filteredTasks = tasks.filter((el) => el.id !== id);
    setTasks(filteredTasks);
  }

  function addTask(val: string) {
    let newTask = {
      id: v1(),
      title: val,
      isDone: false,
    };
    setTasks([newTask, ...tasks]);
  }

  function changeFilter(value: FilterValType) {
    setFilter(value);
  }

  function changeStatus(taskId: string, isDone: boolean) {
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks([...tasks]);
    }
  }

  let tasksForTodoList = tasks;

  if (filter === "active") {
    tasksForTodoList = tasks.filter((el) => !el.isDone);
  }
  if (filter === "completed") {
    tasksForTodoList = tasks.filter((el) => el.isDone);
  }

  return (
    <div className="App">
      <TodoList
        tasks={tasksForTodoList}
        title={"What to learn"}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeStatus={changeStatus}
        filter={filter}
      />
    </div>
  );
}

export default App;
