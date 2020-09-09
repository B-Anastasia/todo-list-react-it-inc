import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta} from "@storybook/react/types-6-0";
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";

export default {
  title: "TodoList/Task",
  component: Task,
} as Meta;

const removeTaskCallback = action("removeTask clicked");
const changeTaskTitleCallback = action("changeTaskTitle used");
const changeTaskStatusCallback = action("changeTaskStatus clicked");

export const TaskIsDone = () => (
  <Task
    task={{ title: "CSS", isDone: true, id: "2" }}
    removeTask={removeTaskCallback}
    changeTaskTitle={changeTaskTitleCallback}
    changeTaskStatus={changeTaskStatusCallback}
  />
);
export const TaskIsUndone = () => (
  <Task
    task={{ title: "CSS", isDone: false, id: "2" }}
    removeTask={removeTaskCallback}
    changeTaskTitle={changeTaskTitleCallback}
    changeTaskStatus={changeTaskStatusCallback}
  />
);
