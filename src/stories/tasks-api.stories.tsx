import React, {useState} from "react";
import {ITaskPropertiesUpdateType, tasksApi} from "../api/tasks-api";

export default {
    title: "API/Tasks",
};

export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');

    const getTasks = () => {
        tasksApi
            .getTasks(todolistId)
            .then(res => setState(res))
    }
    return (
        <div>
            <input placeholder={'Todolist Id'}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}
                   value={todolistId}
            />
            <button onClick={getTasks}>get</button>
            <div>{JSON.stringify(state)}</div>
        </div>
    )
};
export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    const [taskTitle, setTaskTitle] = useState<string>('');
    const [todolistId, setTodolistId] = useState<string>('');

    const createTask = () => {
        if (!taskTitle.trim()) return;
        tasksApi
            .addTask(todolistId, taskTitle)
            .then((res) => setState(res));
    }

    return (
        <div>
            <input placeholder={'Todolist Id'}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}
                   value={todolistId}
            />
            <input placeholder={'Task title'}
                   onChange={(e) => setTaskTitle(e.currentTarget.value)}
                   value={taskTitle}
            />
            <button onClick={createTask}>create</button>
            <div>{JSON.stringify(state)}</div>
        </div>
    )
};
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    const [taskId, setTaskId] = useState<string>('');
    const [todolistId, setTodolistId] = useState<string>('');

    const deleteTask = () => {
        tasksApi
            .deleteTask(todolistId, taskId)
            .then(res => setState(res))
    }

    return (
        <div>
            <input placeholder={'Todolist Id'}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}
                   value={todolistId}
            />
            <input placeholder={'Task id'}
                   onChange={(e) => setTaskId(e.currentTarget.value)}
                   value={taskId}
            />
            <button onClick={deleteTask}>delete</button>
            <div>{JSON.stringify(state)}</div>
        </div>
    )
};

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null);
    const [taskId, setTaskId] = useState<string>('695ff61d-fe62-4550-813c-c56758c25d80');
    const [todolistId, setTodolistId] = useState<string>('b071917b-c682-4479-805c-6efb13d5c500');
    const [propKey, setPropKey] = useState<any>('title');
    const [value, setValue] = useState<string | number>('');

    const properties: ITaskPropertiesUpdateType = {
        title: 'default',
        description: null,
        completed: false,
        status: 0,
        priority: 1,
        startDate: null,
        deadline: null,
    }


    const updateTask = () => {
        tasksApi
            .updateTask(todolistId,
                taskId,
                {...properties,[propKey]: value})
            .then(res => setState(res))
    }
    let names = [];
    for (let key in properties){
        if(properties.hasOwnProperty(key)){
            names.push(key)
        }
    }
    // <option value={key}>{key[0].toUpperCase()+key.slice(1)}</option>)


    return (
        <div>
            <input placeholder={'Todolist Id'}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}
                   value={todolistId}
            />
            <input placeholder={'Task id'}
                   onChange={(e) => setTaskId(e.currentTarget.value)}
                   value={taskId}
            />
            <select value={propKey} onChange={(e) => {
                debugger
                setPropKey(e.currentTarget.value)
            }}>
                {names.map(key => <option value={key}
                >{key[0].toUpperCase() + key.slice(1)}</option>)}
            </select>
            <input placeholder={'description'}
                   onChange={(e) => setValue(e.currentTarget.value)}
                   value={value}
            />
            <button onClick={updateTask}>update</button>
            <div>{JSON.stringify(state)}</div>
        </div>
    )
};
