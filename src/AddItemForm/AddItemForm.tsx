import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

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
    };
    const addNewItem = () => {
        if (val.trim() !== "") {
            props.addItem(val);
        } else {
            setError("Title is required");
        }
        setVal("");
    };

    return (
        <div onBlur={() => setError(null)}>
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
            <IconButton color={"primary"} onClick={addNewItem}>
                <AddBox/>
            </IconButton>
        </div>
    );
});

export default AddItemForm;
