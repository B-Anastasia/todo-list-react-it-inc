import React, { ChangeEvent, useState } from "react";
import { TextField } from "@material-ui/core";

type EditableSpanPropsType = {
  title: string;
  onSaveTitle: (newTitle: string) => void;
};

function EditableSpan(props: EditableSpanPropsType) {
  let [editMode, setEditMode] = useState<boolean>(false);
  let [newTitle, setNewTitle] = useState<string>("");
  const onEditMode = () => {
    setNewTitle(props.title);
    setEditMode(true);
  };
  const offEditMode = () => {
    if (newTitle.trim()) {
      props.onSaveTitle(newTitle);
    } else {
      //check on empty string
      //couldn't insert empty task
      setNewTitle(props.title);
    }
    setEditMode(false);
  };

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value);
  };

  return editMode ? (
    /*<input
          autoFocus={true}
          onBlur={offEditMode}
          value={newTitle}
          onChange={changeTitle}
        />*/
    <TextField
      autoFocus={true}
      onBlur={offEditMode}
      value={newTitle}
      onChange={changeTitle}
    />
  ) : (
    <span onDoubleClick={onEditMode}>{props.title}</span>
  );
}

export default EditableSpan;
