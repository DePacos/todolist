import React from "react";

type PropsType = {
    title: string
    onChange: (titleValue: string) => void
}

export const EditableSpan = ({title, onChange}: PropsType) => {
    const [editMode, setEditConst] = React.useState(false)
    const [localTitle, setLocalTitle] = React.useState('')

    const activeEditMode = () => {
        setEditConst(true)
        setLocalTitle(title)
    }
    const activeViewMode = () => {
        setEditConst(false)
        onChange(localTitle)
    }

    const handlerOnChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setLocalTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <input onChange={handlerOnChange}  onBlur={activeViewMode} value={localTitle} autoFocus/>
            : <span onDoubleClick={activeEditMode}>{title}</span>
    );
};