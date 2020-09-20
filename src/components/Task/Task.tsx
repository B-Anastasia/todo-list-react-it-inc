import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {ITaskType, TasksStatuses} from "../../api/tasks-api";

type TaskPropsType = {
    changeTaskStatus: (taskId: string, status: TasksStatuses, todoListID: string) => void;
    changeTaskTitle: (newTitle: string, taskId: string, todoListId: string) => void;
    removeTask: (id: string, todoListId: string) => void;
    task: ITaskType;
    todolistId: string
};
export const Task = React.memo((props: TaskPropsType) => {

    const {changeTaskStatus, changeTaskTitle, removeTask, todolistId} = props;
    const {id, status, title} = props.task;

    const onRemoveTask = useCallback(() => removeTask(id, todolistId), [id, todolistId, removeTask]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let status = e.currentTarget.checked ? TasksStatuses.Completed : TasksStatuses.New; //new value checked for checked task
        changeTaskStatus(id, status, todolistId);
    }, [id, todolistId, changeTaskStatus]);

    const changeT = useCallback((newTitle: string) => {
        changeTaskTitle(newTitle, id, todolistId);
    }, [id, todolistId, changeTaskTitle]);

    return (
        <div key={id}>
            <Checkbox
                checked={status === TasksStatuses.Completed}
                onChange={onChangeHandler}
                color={"primary"}
            />
            <EditableSpan title={title} onSaveTitle={changeT}/>
            <IconButton onClick={onRemoveTask}>
                <Delete/>
            </IconButton>
        </div>
    );
});
