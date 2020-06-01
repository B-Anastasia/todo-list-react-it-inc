import React from "react";
import {FilterValType, TaskType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number)=>void
    changeFilter:(value:FilterValType)=>void
};

export function TodoList(props: TodoListPropsType) {
    const {title, tasks, removeTask,changeFilter} = props;

    let tasksEls = tasks.map((el: TaskType) => {
        return (
            <li key={el.id}>
                <input type="checkbox" checked={el.isDone}/>
                <span>{el.title}</span>
                <button onClick={() => removeTask(el.id)}>x</button>
            </li>
        );
    });
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input type='text'/>
                <button>+</button>
            </div>
            <ul>
                {tasksEls}
            </ul>
            <div>
                <button onClick={()=>changeFilter('all')}>All</button>
                <button onClick={()=>changeFilter('active')}>Active</button>
                <button onClick={()=>changeFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}