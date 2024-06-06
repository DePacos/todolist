import React from 'react';
import ListItem from "@mui/material/ListItem";
import {SM} from "../styles/material-styles";
import Checkbox from "@mui/material/Checkbox";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TasksType} from "../App";

type TaskProps = {
    task: TasksType
    changeTaskStatusHandler: (taskID: string, taskStatus: boolean) => void
    changeTitleTaskHandler: (taskID: string, titleValue: string) => void
    removeTaskHandler: (taskID: string) => void
}

export const Task = React.memo(({task, changeTaskStatusHandler, changeTitleTaskHandler, removeTaskHandler}: TaskProps) => {
    return (
        <ListItem key={task.id} sx={SM.getListStyles(task.isDone)}>
            <Checkbox
                onChange={() => changeTaskStatusHandler(task.id, task.isDone)}
                color={"success"}
                checked={task.isDone}
                checkedIcon={<DoneOutlineIcon/>}
            />
            <EditableSpan title={task.title} onChange={() => changeTitleTaskHandler(task.id, task.title)}/>
            <IconButton onClick={() => removeTaskHandler(task.id)}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
    )
});