import React,{useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export type TaskType={
    id:number
    title: string
    isDone: boolean
}

export type FilterValType='all'|'active'|'completed';

function App() {

    let [tasks, setTasks]=useState<Array<TaskType>>(
        [
            {id:1, title:'JS', isDone:true},
            {id:2, title:'React', isDone:false},
            {id:3, title:'MobX', isDone:false},
            {id:4, title:'Redux', isDone:false},
        ]
    );

    let [filter,setFilter]=useState<FilterValType>('all');

    function removeTask(id:number) {
        let   filteredTasks=tasks.filter(el=>el.id!==id);
        setTasks(filteredTasks);
    }

    function changeFilter(value:FilterValType) {
        setFilter(value);
    }

    let tasksForTodoList=tasks;

    if(filter==='active'){
        tasksForTodoList=tasks.filter(el=>!el.isDone);
    }
    if(filter==='completed'){
        tasksForTodoList=tasks.filter(el=>el.isDone);
    }


    return (
        <div className="App">
          <TodoList
              tasks={tasksForTodoList}
              title={'What to learn'}
              removeTask={removeTask}
              changeFilter={changeFilter}
          />
        </div>
    );
}

export default App;
