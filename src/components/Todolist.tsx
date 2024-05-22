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

type TodolistProps = {
    todoId: string,
    title: string,
    date?: string,
    tasks: TasksStateType,
    tasksFilter: string,
    changeFilter: (todoId: string, filter: Filter) => void,
    changeChecked: (todoId: string, taskId: string, isDone: boolean) => void,
    changeTaskTitle: (todoId: string, taskId: string, value: string) => void
    changeTitleTodo: (todoId: string, titleValue: string) => void
    addTask: (todoId: string, inputValue: string) => void,
    removeTask: (todoId: string, taskId: string) => void,
    removeTodoList: (todoId: string) => void,
}

export const Todolist = (
    {
        todoId,
        title,
        date,
        tasks,
        changeFilter,
        changeTaskTitle,
        changeTitleTodo,
        tasksFilter,
        changeChecked,
        addTask,
        removeTask,
        removeTodoList,

    }: TodolistProps) => {

    const changeTasksFilter = (tasks: Array<TasksType>) => {
        if (tasksFilter === 'active') {
            return tasks.filter(task => !task.isDone)
        }

        if (tasksFilter === 'completed') {
            return tasks.filter(task => task.isDone)
        }

        return tasks
    }

    const addTasksHandler = (inputValue: string) => {
        addTask(todoId, inputValue)
    }

    const filterHandler = (filter: Filter) => {
        changeFilter(todoId, filter)
    }

    const changeCheckedHandler = (taskId: string, isDone: boolean) => {
        changeChecked(todoId, taskId, isDone)
    }

    const removeTaskHandler = (taskId: string) => {
        removeTask(todoId, taskId)
    }
    const removeTodoHandler = () => {
        removeTodoList(todoId)
    }

    const handlerChangeTitleTodo = (titleValue: string) =>{
        changeTitleTodo(todoId, titleValue)
    }

    const changeTitleTaskHandler = (titleValue: string, taskId:string) => {
        changeTaskTitle(todoId, taskId, titleValue)
    }

    return (
        <Paper elevation={6} sx={SM.wrapTodoList}>
            <h2><EditableSpan title={title} onChange={handlerChangeTitleTodo}/></h2>
            <IconButton sx={SM.closeTodo} onClick={removeTodoHandler}>
                <CancelIcon/>
            </IconButton>
            <AddItemForm addItem={addTasksHandler}/>
            <List>
                {changeTasksFilter(tasks[todoId]).length !== 0 ?
                    changeTasksFilter(tasks[todoId]).map(task => {
                        return (
                            <ListItem key={task.id} sx={SM.getListStyles(task.isDone)}>
                                <Checkbox
                                    onChange={() => changeCheckedHandler(task.id, task.isDone)}
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
                <BasicButton variant={(tasksFilter === 'all') ? 'outlined' : 'contained'} color={'success'} title="All" onClick={() => filterHandler('all')}/>
                <BasicButton variant={(tasksFilter === 'active') ? 'outlined' : 'contained'} color={'success'} title="Active" onClick={() => filterHandler('active')}/>
                <BasicButton variant={(tasksFilter === 'completed') ? 'outlined' : 'contained'} color={'success'} title="Completed" onClick={() => filterHandler('completed')}/>
            </Box>
        </Paper>
    );
}

