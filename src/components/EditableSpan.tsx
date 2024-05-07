import React from "react";

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
            ? <input onChange={handlerOnChange}  onBlur={activeMode} value={localTitle} autoFocus/>
            : <span onDoubleClick={activeMode}>{localTitle}</span>
    );
};