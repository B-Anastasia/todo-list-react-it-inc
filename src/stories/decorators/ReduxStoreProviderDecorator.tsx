import React from "react";
import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import {v1} from "uuid";
import {tasksReducer} from "../../state/tasks-reducer";
import {todolistsReducer} from "../../state/todolists-reducer";
import {AppRootStateType} from "../../state/store";
import {TasksPriorities, TasksStatuses} from "../../api/tasks-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
});

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", order: 0, addedDate: ''},
        {id: "todolistId2", title: "What to buy", filter: "all", order: 0, addedDate: ''},
    ],
    tasks: {
        "todolistId1": [
            {
                id: v1(), title: "HTML&CSS", todoListId: 'todolistId1',
                status: TasksStatuses.Completed,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TasksPriorities.Low,
                completed: true,
                description: '',
            },
            {
                id: v1(), title: "JS", todoListId: 'todolistId1',
                status: TasksStatuses.New,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TasksPriorities.Low,
                completed: true,
                description: '',
            },
        ],
        "todolistId2": [
            {
                id: v1(), title: "Milk",
                todoListId: 'todolistId2',
                status: TasksStatuses.Completed,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TasksPriorities.Low,
                completed: true,
                description: '',
            },
            {
                id: v1(), title: "React Book",
                todoListId: 'todolistId2',
                status: TasksStatuses.New,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TasksPriorities.Low,
                completed: true,
                description: '',
            },
        ],
    },
};

export const storyBookStore = createStore(
    rootReducer,
    initialGlobalState as AppRootStateType
);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider store={storyBookStore}>{storyFn()}</Provider>
);
