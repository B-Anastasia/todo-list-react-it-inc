import {instance} from "./base-api";
import {IResponseType} from "./todolist-api";

export type ITaskPropertiesUpdateType = {
    title: string
    description: string | null
    completed: boolean
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
}

export type TasksStateType = {
    [key: string]: Array<ITaskType>;
};

export enum TasksStatuses{
    New=0,
    InProgress=1,
    Completed=2,
    Draft=3
}
export enum TasksPriorities{
    Low =0,
    Middle=1,
    Hi=2,
    Urgently=3,
    Later=4
}

export type ITaskType = {
    id: string
    title: string
    description: string
    completed: boolean
    status: TasksStatuses
    priority: TasksPriorities
    startDate: string
    deadline: string
    todoListId: string
    order: number
    addedDate: string
}

type ITasksResponseType = {
    items: ITaskType[],
    error: string,
    totalCount: number
}

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance
            .get<ITasksResponseType>(`todo-lists/${todolistId}/tasks`)
            .then(res => res.data)
    },
    addTask(todolistId: string, title: string) {
        return instance
            .post<IResponseType<{item:ITaskType}>>(`todo-lists/${todolistId}/tasks`, {title})
            .then(res => res.data)
    },
    deleteTask(todolistId: string,taskId:string){
        return instance
            .delete<IResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
            .then(res=>res.data)
    },
    updateTask(todolistId: string,taskId:string,properties:ITaskPropertiesUpdateType){
        return instance
            .put<IResponseType<{item:ITaskType}>>(`todo-lists/${todolistId}/tasks/${taskId}`,properties)
            .then(res=>res.data)
    }
}