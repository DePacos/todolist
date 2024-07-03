import React, { useState } from 'react'
import {taskAPI} from "../../api/tasksAPI";
import {ResponseType} from "../../model/todolist-reducer";
import {GetTasksType, UpdateTaskModelType} from "../../model/task-reducer";

export default {
    title: 'API/Tasks',
}

export const GetTasks = () => {
    const [taskTitle, setTaskTitle] = useState('')
    const [state, setState] = useState<GetTasksType>({
        error: 'error',
        totalCount: 0,
        items: []
    })

    const getTasksHandler = () =>{
        taskAPI.getTasks(taskTitle)
            .then(res => {
                setState(res.data)
            })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                TodoId: <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value)} value={taskTitle}/>
                <button onClick={getTasksHandler}>GetTasks</button>
            </div>
        </div>
    )
}

export const CreateTask = () => {
    const [todoId, setSetTodoId] = useState('')
    const [taskTitle, setTaskTitle] = useState('')
    const [state, setState] = useState<ResponseType>(
        {
            resultCode: 111,
            messages: ['test message'],
            fieldsErrors: ['test error'],
            data: {}
        }
    )

    const createTaskHandler = () =>{
        taskAPI.createTask(todoId, taskTitle)
            .then(res => {
                setState(res.data)
            })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                TodoId: <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSetTodoId(e.currentTarget.value)} value={todoId}/>
                Task title: <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value)} value={taskTitle}/>
                <button onClick={createTaskHandler}>CreateTask</button>
            </div>
        </div>
    )
}

export const DeleteTask = () => {
    const [todoId, setTodoId] = useState('')
    const [taskId, setTaskId] = useState('')
    const [state, setState] = useState<ResponseType>(
        {
            resultCode: 111,
            messages: ['test message'],
            fieldsErrors: ['test error'],
            data: {}
        }
    )

    const deleteTaskHandler = () =>{
        taskAPI.removeTask(todoId, taskId)
            .then(res => {
                setState(res.data)
            })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                TodoId: <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTodoId(e.currentTarget.value)} value={todoId}/>
                TaskId: <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaskId(e.currentTarget.value)} value={taskId}/>
                <button onClick={deleteTaskHandler}>DeleteTask</button>
            </div>
        </div>
    )
}

export const UpdateTask = () => {
    const [todoId, setTodoId] = useState('')
    const [taskId, setTaskId] = useState('')
    const [updateValue, setUpdateValue] = useState('')
    const [state, setState] = useState<UpdateTaskModelType>(
        {
            title: 'test title',
            description: 'test description',
            status: 555,
            priority: 111,
            startDate: '2020',
            deadline: 'on'
        }
    )

    const updateTaskHandler = () =>{
        // taskAPI.updateTask(todoId, taskId, updateValue)
        //     .then(res => {
        //         setState(res.data)
        //     })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                TodoId: <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTodoId(e.currentTarget.value)} value={todoId}/>
                TaskId: <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaskId(e.currentTarget.value)} value={taskId}/>
                Update Value: <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUpdateValue(e.currentTarget.value)} value={updateValue}/>
                <button onClick={updateTaskHandler}>UpdateTask</button>
            </div>
        </div>
    )
}