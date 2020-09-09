import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { IconButton, TextField } from "@material-ui/core";
import { AddBox } from "@material-ui/icons";

export type AddItemFormPropsType = {
  addItem: (val: string) => void;
};

const AddItemForm = React.memo((props: AddItemFormPropsType) => {
  console.log("AddItemForm is called");

  let [val, setVal] = useState<string>("");
  let [error, setError] = useState<string | null>(null);
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (error !== null) setError(null);
    setVal(e.currentTarget.value);
  };
  const onKeyPressAdd = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) setError(null);

    if (e.charCode === 13) {
      addNewItem();
    }
    // console.log(e.charCode);
  };
  const addNewItem = () => {
    if (val.trim() !== "") {
      props.addItem(val);
    } else {
      setError("Title is required");
    }
    setVal("");
  };
  //add task only when enter+alt but if enter so next line
  /*  const onClickNewLine = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && e.altKey) {
        addNewItem();
      } else if (e.key === "Enter") {
        setVal(`${val}\r\n`);
      }
    };*/

  return (
    <div onBlur={() => setError(null)}>
      {/*   <textarea onChange={onChangeText} value={val} onKeyUp={onClickNewLine}>
          {val}
        </textarea>*/}
      <TextField
        variant={"outlined"}
        value={val}
        onChange={onChangeInput}
        onKeyPress={onKeyPressAdd}
        onFocus={() => setError(null)}
        label={"Title"}
        error={!!error}
        helperText={error}
      />
      {/* <input
        type="text"
        value={val}
        onChange={onChangeInput}
        onKeyPress={onKeyPressAdd}
        onFocus={() => setError(null)}
        className={error ? "error" : ""}
      />*/}
      {/*{error && <div className={"error-message"}>{error}</div>}*/}
      {/*<button onClick={addNewItem}>+</button>*/}
      <IconButton color={"primary"} onClick={addNewItem}>
        <AddBox />
      </IconButton>
    </div>
  );
});

export default AddItemForm;
