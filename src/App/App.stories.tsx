import React from "react";
import {Meta} from "@storybook/react/types-6-0";
import App from "./App";

export default {
    title: "TodoList/App",
    component: App,
} as Meta;

export const AppStory = () => (
    <App  />
);