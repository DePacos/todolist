import React from 'react';
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import {EditableSpan} from "../../components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {removeTaskTC, TasksType, updateTaskTC} from "../../store/reducers/task-reducer";
import {useAppDispatch} from "../../store/store";


export const Task = React.memo(({task, disable}: TaskProps) => {
    const dispatch = useAppDispatch()

    const updateTaskTitleHandler = (title: string) => {
        dispatch(updateTaskTC(task.todoListId, task.id, {title}))
    }

    const updateTaskStatusHandler = (status: number) => {
        dispatch(updateTaskTC(task.todoListId, task.id, {status}))
    }

    const removeTaskHandler = React.useCallback(() => {
        dispatch(removeTaskTC(task.todoListId, task.id))
    }, [])

    return (
        <ListItem key={task.id}>
            <Checkbox
                onChange={() => updateTaskStatusHandler(task.status === 0 ? 1 : 0)}
                color={"success"}
                checked={!!task.status}
                checkedIcon={<DoneOutlineIcon/>}
                disabled={disable}
            />
            <EditableSpan title={task.title} onChange={(taskTitle:string) => updateTaskTitleHandler(taskTitle)}/>
            <IconButton onClick={removeTaskHandler} disabled={disable}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
    )
})


type TaskProps = {
    task: TasksType
    disable?: boolean
}