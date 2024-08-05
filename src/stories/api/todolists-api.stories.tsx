import React, {useEffect, useState} from 'react'
import {TodoListsType} from "../../store/reducers/todolist-reducer";
import {todoListsAPI, ResponseType,} from "../../api/todolistsAPI";

export default {
    title: 'API/Todolist',
}

export const GetTodoLists = () => {
    const [state, setState] = useState<TodoListsType[]>([{
        id: '111',
        addedDate: '2020',
        title: 'test title',
        order: 111
    }])
    useEffect(() => {
        todoListsAPI.getTodolist()
            .then(res => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodoList = () => {
    const [todoTitle, setTodoTitle] = useState('')
    const [state, setState] = useState<ResponseType>(
        {
            resultCode: 111,
            messages: ['test message'],
            fieldsErrors: [{field: 'field', error: 'error',}],
            data: {}
        }
    )

    const createTodoListHandler = () =>{
        todoListsAPI.createTodolist(todoTitle)
            .then(res => {
                setState(res.data)
            })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
               TodoTitle: <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTodoTitle(e.currentTarget.value)} value={todoTitle}/>
                <button onClick={createTodoListHandler}>CreateTodoList</button>
            </div>
        </div>
    )
}

export const DeleteTodoList = () => {
    const [todoId, setTodoId] = useState('')
    const [state, setState] = useState<ResponseType>(
        {
            resultCode: 111,
            messages: ['test message'],
            fieldsErrors: [{field: 'field', error: 'error',}],
            data: {}
        }
    )

    const deleteTodoListHandler = () =>{
        todoListsAPI.removeTodolist(todoId)
            .then(res => {
                setState(res.data)
            })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
               TodoId: <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTodoId(e.currentTarget.value)}
                       value={todoId}/>
                <button onClick={deleteTodoListHandler}>DeleteTodoList</button>
            </div>
        </div>
    )
}

export const UpdateTodoList = () => {
    const [todoId, setTodoId] = useState('')
    const [updateValue, setUpdateValue] = useState('')
    const [state, setState] = useState<ResponseType>(
        {
            resultCode: 111,
            messages: ['test message'],
            fieldsErrors: [{field: 'field', error: 'error',}],
            data: {}
        }
    )

    const updateTodoListHandler = () =>{
        todoListsAPI.updateTodolist(todoId, updateValue)
            .then(res => {
                setState(res.data)
            })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
               id: <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTodoId(e.currentTarget.value)} value={todoId}/>
                value: <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUpdateValue(e.currentTarget.value)} value={updateValue}/>
                <button onClick={updateTodoListHandler}>DeleteTodoList</button>
            </div>
        </div>
    )
}