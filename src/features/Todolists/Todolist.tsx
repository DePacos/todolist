import React, {useEffect} from 'react';
import {BasicButton} from "../../components/Button";
import {taskTC} from "../../store/reducers/task-reducer";
import {EditableSpan} from "../../components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import CancelIcon from '@mui/icons-material/Cancel';
import Paper from "@mui/material/Paper";
import {SM} from '../../styles/material-styles'
import Box from "@mui/material/Box";
import {useAppDispatch} from "../../store/store";
import {
    changeTodolistFilterAC,
    Filter,
    removeTodolistTC,
    updateTodoListTitleTC
} from "../../store/reducers/todolist-reducer";
import {TasksList} from "../Task/TasksList";


export const Todolist = React.memo((
    {
        todoId,
        title,
        date,
        tasksFilter,
    }: TodolistProps) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(taskTC(todoId))
    }, [])

    const changeFilterHandler = React.useCallback((filter: Filter) => {
        dispatch(changeTodolistFilterAC(todoId, filter))
    }, [])

    const updateTodolistTitle = React.useCallback((title: string) => {
        dispatch(updateTodoListTitleTC(todoId, title))
    }, [])

    const removeTodoList = React.useCallback( () => {
        dispatch(removeTodolistTC(todoId))
    }, [])

    return (
        <Paper elevation={6} sx={SM.wrapTodoList}>
            <h2><EditableSpan title={title} onChange={updateTodolistTitle}/></h2>
            <IconButton sx={SM.closeTodo} onClick={removeTodoList}>
                <CancelIcon/>
            </IconButton>
            <TasksList todoId={todoId} tasksFilter={tasksFilter}/>
            {date ? <div>{date}</div> : null}
            <Box sx={SM.wrapStatusBtn}>
                <BasicButton
                    variant={(tasksFilter === 'all') ? 'outlined' : 'contained'}
                    color={'success'}
                    title="All"
                    onClick={() => changeFilterHandler('all')}/>
                <BasicButton
                    variant={(tasksFilter === 'active') ? 'outlined' : 'contained'}
                    color={'success'}
                    title="Active"
                    onClick={() => changeFilterHandler('active')}/>
                <BasicButton
                    variant={(tasksFilter === 'completed') ? 'outlined' : 'contained'}
                    color={'success'}
                    title="Completed"
                    onClick={() => changeFilterHandler('completed')}/>
            </Box>
        </Paper>
    );
})


type TodolistProps = {
    todoId: string
    title: string
    date?: string
    order?: number
    tasksFilter: string
}