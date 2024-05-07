import React from 'react';
import {Button} from "./Button";
import {S} from "./Todolist_Styled";
import {Filter, TasksStateType, TasksType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


type TodolistProps = {
    todoId: string,
    title: string,
    date?: string,
    tasks: TasksStateType,
    tasksFilter: string,
    changeFilter: (todoId: string, filter: Filter) => void,
    changeChecked: (todoId: string, taskId: string) => void,
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

    const changeCheckedHandler = (taskId: string) => {
        changeChecked(todoId, taskId)
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
        <S.TodolistWrap>
            <Button title="X" callback={removeTodoHandler}/>
            <h3><EditableSpan title={title} onChange={handlerChangeTitleTodo}/></h3>
            <AddItemForm addItem={addTasksHandler}/>
            <ul>
                {changeTasksFilter(tasks[todoId]).length !== 0 ?
                    changeTasksFilter(tasks[todoId]).map(task => {

                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input
                                    onChange={() => changeCheckedHandler(task.id)}
                                    type="checkbox"
                                    checked={task.isDone}
                                />
                                <EditableSpan title={task.title}
                                              onChange={(titleValue) => changeTitleTaskHandler(titleValue, task.id)}/>
                                <Button title="X" callback={() => removeTaskHandler(task.id)}/>
                            </li>
                        )
                    })
                    : <span>No Tasks</span>
                }
            </ul>
            {date ? <div>{date}</div> : null}
            <S.ButtonWrap>
                <Button active={tasksFilter === 'all'} title="All" callback={() => filterHandler('all')}/>
                <Button active={tasksFilter === 'active'} title="Active" callback={() => filterHandler('active')}/>
                <Button active={tasksFilter === 'completed'} title="Completed"
                        callback={() => filterHandler('completed')}/>
            </S.ButtonWrap>
        </S.TodolistWrap>
    );
}
