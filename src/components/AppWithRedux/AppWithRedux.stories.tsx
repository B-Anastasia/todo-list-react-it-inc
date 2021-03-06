import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta } from "@storybook/react/types-6-0";

import AppWithRedux from "./AppWithRedux";
import { ReduxStoreProviderDecorator } from "../../stories/decorators/ReduxStoreProviderDecorator";

export default {
  title: "TodoList/AppWithRedux",
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorator],
} as Meta;

export const AppWithReduxStory = () => <AppWithRedux />;
