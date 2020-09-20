import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta } from "@storybook/react/types-6-0";

import {HookStoreProviderDecorator} from "./stories/decorators/HookStoreProviderDecorator";
import AppWithHookReducer from "./AppWithHookReducer";

export default {
    title: "TodoList/AppWithHookReducer",
    component: AppWithHookReducer,
    decorators: [HookStoreProviderDecorator],
} as Meta;

export const AppWithHookReducerStory = () => <AppWithHookReducer />;