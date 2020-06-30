import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type AddItemFormPropsType = {
  addItem: (val: string) => void;
};

function AddItemForm(props: AddItemFormPropsType) {
  let [val, setVal] = useState<string>("");
  let [error, setError] = useState<string | null>(null);
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setVal(e.currentTarget.value);
  };
  const onKeyPressAdd = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);

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
    <div>
      {/*   <textarea onChange={onChangeText} value={val} onKeyUp={onClickNewLine}>
          {val}
        </textarea>*/}
      <input
        type="text"
        value={val}
        onChange={onChangeInput}
        onKeyPress={onKeyPressAdd}
        onFocus={() => setError(null)}
        className={error ? "error" : ""}
      />
      {error && <div className={"error-message"}>{error}</div>}
      <button onClick={addNewItem}>+</button>
    </div>
  );
}

export default AddItemForm;
