import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import { action } from "@storybook/addon-actions";
import { EditableSpan, EditableSpanPropsType } from "./EditableSpan";

export default {
  title: "TodoList/EditableSpan",
  component: EditableSpan,
} as Meta;

export const EditableSpanStory: Story<EditableSpanPropsType> = (args) => (
  <EditableSpan
    {...args}
    onSaveTitle={action("Save title")}
    title={"Start value"}
  />
);
