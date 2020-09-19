import React, {useEffect, useState} from "react";
import {todolistsApi} from "../api/todolist-api";

export default {
    title: "API/Todolists",
};

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        todolistsApi
            .getTodolists()
            .then((res) => setState(res));
    }, []);

    return <div> {JSON.stringify(state)}</div>;
};
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        todolistsApi
            .createTodolist("New todolist")
            .then((res) => setState(res));
    }, []);

    return <div> {JSON.stringify(state)}</div>;
};
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        todolistsApi
            .deleteTodolist('415e62ce-2e08-4591-a1cd-290b620497c6')
            .then(res => setState(res))
    }, []);

    return <div> {JSON.stringify(state)}</div>;
};
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        todolistsApi
            .updateTodolist('630342ae-ff04-4fd3-bda6-ab2488acc341', 'Hey Hey')
            .then(res => setState(res))

    }, []);

    return <div> {JSON.stringify(state)}</div>;
};
