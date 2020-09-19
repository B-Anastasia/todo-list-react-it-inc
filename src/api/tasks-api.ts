import {instance} from "./base-api";

export type ITaskPropertiesUpdateType = {
    title: string
    description: string | null
    completed: boolean
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
}

type ITaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
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
            .post(`todo-lists/${todolistId}/tasks`, {title})
            .then(res => res.data)
    },
    deleteTask(todolistId: string,taskId:string){
        return instance
            .delete(`todo-lists/${todolistId}/tasks/${taskId}`)
            .then(res=>res.data)
    },
    updateTask(todolistId: string,taskId:string,properties:ITaskPropertiesUpdateType){
        return instance
            .put(`todo-lists/${todolistId}/tasks/${taskId}`,properties)
            .then(res=>res.data)
    }
}