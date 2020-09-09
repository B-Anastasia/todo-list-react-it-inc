import React, { ChangeEvent } from "react";
import { Checkbox, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { TaskType } from "../App";
import { EditableSpan } from "../EditableSpan/EditableSpan";

type TaskPropsType = {
  changeTaskStatus: (newIsDone: boolean, id: string) => void;
  changeTaskTitle: (newTitle: string, id: string) => void;
  removeTask: (id: string) => void;
  task: TaskType;
};
export const Task = React.memo((props: TaskPropsType) => {
  const onRemoveTask = () => props.removeTask(props.task.id);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDone = e.currentTarget.checked; //new value checked for checked task
    props.changeTaskStatus(newIsDone, props.task.id);
  };

  const changeT = (newTitle: string) => {
    props.changeTaskTitle(newTitle, props.task.id);
  };

  return (
    <div key={props.task.id}>
      <Checkbox
        checked={props.task.isDone}
        onChange={onChangeHandler}
        color={"primary"}
      />
      <EditableSpan title={props.task.title} onSaveTitle={changeT} />
      <IconButton onClick={onRemoveTask}>
        <Delete />
      </IconButton>
    </div>
  );
});
