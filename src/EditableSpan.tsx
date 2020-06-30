import React, { ChangeEvent, useState } from "react";

type EditableSpanPropsType = {
  title: string;
  onSaveTitle: (newTitle: string) => void;
};

function EditableSpan(props: EditableSpanPropsType) {
  let [editMode, setEditMode] = useState<boolean>(false);
  let [newTitle, setNewTitle] = useState<string>(props.title);
  const onEditMode = () => {
    setEditMode(true);
  };
  const offEditMode = () => {
    setEditMode(false);
    props.onSaveTitle(newTitle);
    // setNewTitle("");
  };

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value);
  };

  return editMode ? (
    <input
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
