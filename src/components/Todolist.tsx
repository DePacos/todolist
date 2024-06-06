import React from 'react';
import {BasicButton} from "./Button";
import {Filter, TasksType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

import IconButton from "@mui/material/IconButton";
import CancelIcon from '@mui/icons-material/Cancel';
import Paper from "@mui/material/Paper";
import {SM} from '../styles/material-styles'
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../redux/store";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "../model/task-reducer";
import {ChangeTodolistFilterAC} from "../model/todolist-reducer";
import {Task} from "./Task";

type TodolistProps = {
    todoId: string,
    title: string,
    date?: string,
    tasksFilter: string,
    changeTitleTodo: (todoId: string, titleValue: string) => void
    removeTodoList: (todoId: string) => void,
}

export const Todolist = React.memo((
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

    const addTasksHandler = React.useCallback((inputValue: string) => {
        dispatch(AddTaskAC(todoId, inputValue))
    }, [])

    const removeTaskHandler = React.useCallback((taskId: string) => {
        dispatch(RemoveTaskAC(todoId, taskId))
    }, [])

    const changeTitleTaskHandler = React.useCallback((titleValue: string, taskId:string) => {
        dispatch(ChangeTaskTitleAC(todoId, taskId, titleValue))
    },[])

    const changeTaskStatusHandler = React.useCallback((taskId: string, isDone: boolean) => {
        dispatch(ChangeTaskStatusAC(todoId, taskId, isDone))
    }, [])

    const changeFilterHandler = React.useCallback((filter: Filter) => {
        dispatch(ChangeTodolistFilterAC(todoId, filter))
    }, [])


    const getTasksFilter = (tasks: Array<TasksType>) => {
        if (tasksFilter === 'active') {
            return tasks.filter(task => !task.isDone)
        }

        if (tasksFilter === 'completed') {
            return tasks.filter(task => task.isDone)
        }
        return tasks
    }

    const handlerChangeTitleTodo = React.useCallback((titleValue: string) =>{
        changeTitleTodo(todoId, titleValue)
    }, [])

    const removeTodoHandler = () => {
        removeTodoList(todoId)
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
                            <Task
                                key={task.id}
                                task={task}
                                changeTaskStatusHandler={changeTaskStatusHandler}
                                changeTitleTaskHandler={changeTitleTaskHandler}
                                removeTaskHandler={removeTaskHandler}
                            />
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
})
