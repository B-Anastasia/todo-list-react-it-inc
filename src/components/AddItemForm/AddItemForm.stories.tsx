import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import AddItemForm, { AddItemFormPropsType } from "./AddItemForm";
import { action } from "@storybook/addon-actions";

export default {
  title: "TodoList/AddItemForm",
  component: AddItemForm,
  argTypes: {
    addItem: () => action("Clicked add item"),
  },
} as Meta;

export const AddItemFormStory: Story<AddItemFormPropsType> = (args) => (
  <AddItemForm {...args} addItem={action("Clicked add item")} />
);
