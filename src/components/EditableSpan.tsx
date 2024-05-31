import React from "react";
import TextField from "@mui/material/TextField";

type PropsType = {
    title: string
    onChange: (titleValue: string) => void
}

export const EditableSpan = ({title, onChange}: PropsType) => {
    const [editMode, setEditConst] = React.useState(false)
    const [localTitle, setLocalTitle] = React.useState(title)

    const activeMode = () => {
        setEditConst(!editMode)
        onChange(localTitle)
    }

    const handlerOnChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setLocalTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <TextField
                id="filled-basic"
                label="Edit title"
                variant="standard"
                onChange={handlerOnChange}
                onBlur={activeMode}
                value={localTitle}
                autoFocus
            />
            : <span title="Doubble click for editing" onDoubleClick={activeMode}>{localTitle}</span>
    );
};