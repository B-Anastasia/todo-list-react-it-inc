import React from "react";
import {Meta} from "@storybook/react/types-6-0";
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {TasksPriorities, TasksStatuses} from "../../api/tasks-api";

export default {
    title: "TodoList/Task",
    component: Task,
} as Meta;

const removeTaskCallback = action("removeTask clicked");
const changeTaskTitleCallback = action("changeTaskTitle used");
const changeTaskStatusCallback = action("changeTaskStatus clicked");

export const TaskIsDone = () => (
    <Task
        task={
            {
                title: "CSS", id: "2",
                todoListId: 'todoListID1',
                status: TasksStatuses.Completed,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TasksPriorities.Low,
                completed: true,
                description: '',
            }
        }
        todolistId={'todoListID1'}
        removeTask={removeTaskCallback}
        changeTaskTitle={changeTaskTitleCallback}
        changeTaskStatus={changeTaskStatusCallback}
    />
);
export const TaskIsUndone = () => (
    <Task
        task={
            {
                title: "CSS", id: "2",
                todoListId: 'todoListID1',
                status: TasksStatuses.New,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TasksPriorities.Low,
                completed: true,
                description: '',
            }
        }
        todolistId={'todoListID1'}
        removeTask={removeTaskCallback}
        changeTaskTitle={changeTaskTitleCallback}
        changeTaskStatus={changeTaskStatusCallback}
    />
);
