import {instance} from "./base-api";

export type ITodolistType = {
    id: string;
    addedDate: string;
    order: number;
    title: string;
};

export type IResponseType<D = {}> = {
    resultCode: number;
    messages: Array<string>;
    data: D;
};
/*
//all this types replaced with IResponseType<D = {}>

type ICreateTodolistResponseType = {
    data: {
        item: ITodolistType;
    };
    resultCode: number;
    messages: string[];
};
type IUpdateTodolistResponseType = {
    resultCode: number;
    messages: string[];
    data: {};
};
type IDeleteTodolistResponseType = {
    resultCode: number;
    messages: string[];
    data: {};
};
*/

export const todolistsApi = {
    getTodolists() {
        return instance
            .get<Array<ITodolistType>>("todo-lists")
            .then((res) => res.data);
    },
    createTodolist(title: string) {
        return instance
            .post<IResponseType<{ item: ITodolistType }>>("todo-lists", {title})
            .then((res) => res.data);
    },
    deleteTodolist(todolistId: string) {
        return instance
            .delete<IResponseType>(`todo-lists/${todolistId}`)
            .then(res => res.data)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance
            .put<IResponseType>(`todo-lists/${todolistId}`, {title})
            .then(res => res.data)
    }
};
