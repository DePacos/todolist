import React from 'react';
import {BasicButton} from "./Button";
import {Filter, TasksStateType, TasksType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import CancelIcon from '@mui/icons-material/Cancel';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import Paper from "@mui/material/Paper";
import Checkbox from '@mui/material/Checkbox';
import {SM} from '../styles/material-styles'
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../redux/store";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "../model/task-reducer";
import {ChangeTodolistFilterAC} from "../model/todolist-reducer";

type TodolistProps = {
    todoId: string,
    title: string,
    date?: string,
    tasksFilter: string,
    changeTitleTodo: (todoId: string, titleValue: string) => void
    removeTodoList: (todoId: string) => void,
}

export const Todolist = (
    {
        todoId,
        title,
        date,
        changeTitleTodo,
        tasksFilter,
        removeTodoList,
    }: TodolistProps) => {

    const tasks = useSelector<AppRootState, Array<TasksType>>(state => state.tasks[todoId])
    const dispatch = useDispatch()

    const addTasksHandler = (inputValue: string) => {
        dispatch(AddTaskAC(todoId, inputValue))
    }

    const removeTaskHandler = (taskId: string) => {
        dispatch(RemoveTaskAC(todoId, taskId))
    }

    const changeTitleTaskHandler = (titleValue: string, taskId:string) => {
        dispatch(ChangeTaskTitleAC(todoId, taskId, titleValue))
    }

    const changeTaskStatusHandler = (taskId: string, isDone: boolean) => {
        dispatch(ChangeTaskStatusAC(todoId, taskId, isDone))
    }

    const changeFilterHandler = (filter: Filter) => {
        dispatch(ChangeTodolistFilterAC(todoId, filter))
    }

    const getTasksFilter = (tasks: Array<TasksType>) => {
        if (tasksFilter === 'active') {
            return tasks.filter(task => !task.isDone)
        }

        if (tasksFilter === 'completed') {
            return tasks.filter(task => task.isDone)
        }
        return tasks
    }

    const removeTodoHandler = () => {
        removeTodoList(todoId)
    }

    const handlerChangeTitleTodo = (titleValue: string) =>{
        changeTitleTodo(todoId, titleValue)
    }


    return (
        <Paper elevation={6} sx={SM.wrapTodoList}>
            <h2><EditableSpan title={title} onChange={handlerChangeTitleTodo}/></h2>
            <IconButton sx={SM.closeTodo} onClick={removeTodoHandler}>
                <CancelIcon/>
            </IconButton>
            <AddItemForm addItem={addTasksHandler}/>
            <List>
                {getTasksFilter(tasks).length !== 0 ?
                    getTasksFilter(tasks).map(task => {
                        return (
                            <ListItem key={task.id} sx={SM.getListStyles(task.isDone)}>
                                <Checkbox
                                    onChange={() => changeTaskStatusHandler(task.id, task.isDone)}
                                    color={"success"}
                                    checked={task.isDone}
                                    checkedIcon={<DoneOutlineIcon/>}
                                />
                                <EditableSpan title={task.title}
                                              onChange={(titleValue) => changeTitleTaskHandler(titleValue, task.id)}/>
                                <IconButton onClick={() => removeTaskHandler(task.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        )
                    })
                    : <span>No Tasks</span>
                }
            </List>
            {date ? <div>{date}</div> : null}
            <Box sx={SM.wrapStatusBtn}>
                <BasicButton variant={(tasksFilter === 'all') ? 'outlined' : 'contained'} color={'success'} title="All" onClick={() => changeFilterHandler('all')}/>
                <BasicButton variant={(tasksFilter === 'active') ? 'outlined' : 'contained'} color={'success'} title="Active" onClick={() => changeFilterHandler('active')}/>
                <BasicButton variant={(tasksFilter === 'completed') ? 'outlined' : 'contained'} color={'success'} title="Completed" onClick={() => changeFilterHandler('completed')}/>
            </Box>
        </Paper>
    );
}

