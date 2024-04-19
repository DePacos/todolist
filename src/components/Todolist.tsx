import React from 'react';
import {Button} from "./Button";
import {S} from "./Todolist_Styled";
import {Filter, TasksListsType} from "../App";



type TodolistProps = {
    todoId: string,
    title: string,
    date?: string,
    tasks: Array<TasksListsType>,
    tasksFilter: string,
    changeFilter: (todoId: string, filter:Filter) => void,
    changeChecked: (todoId: string, taskId: string) => void,
    addTask: (todoId: string, inputValue: string) => void,
    addTodo: () => void,
    removeTask: (todoId: string, taskId: string) => void,
    removeTodo: (todoId: string) => void,
}

export const Todolist = (
    {
        todoId,
        title,
        date,
        tasks,
        changeFilter,
        tasksFilter,
        changeChecked,
        addTask,
        addTodo,
        removeTask,
        removeTodo,
    }:TodolistProps) => {

    const [inputValue, setInputValue] = React.useState('')

    const checkInputValue = (e:React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.currentTarget.value)
    }

    const inputValidate = (inValue: string, typeValidate: string, e?:React.KeyboardEvent<HTMLInputElement>) => {
        let checkInputLength = inValue.length < 21
        let checkInputSpace = inValue.trim() === ''

        if(typeValidate === 'button'){
            if(!inValue || !checkInputLength || checkInputSpace){return true}
        }

        if(typeValidate === 'keyBoard'){
            if(e?.ctrlKey && e?.code === 'Enter' && inValue && checkInputLength && !checkInputSpace){return true}
        }

        if(typeValidate === 'message'){
            return !checkInputLength
        }

        return false
    }

    const inputKeyHandler = (e:React.KeyboardEvent<HTMLInputElement>) => {
            if(inputValidate(inputValue, 'keyBoard', e)){
                addTask(todoId, inputValue)
                setInputValue('')
            }
    }

    const addTaskHandler = () => {
        addTask(todoId, inputValue)
        setInputValue('')
    }

    const filterHandler = (filter: Filter) =>{changeFilter(todoId, filter)}

    const  changeCheckedHandler = (taskId: string) => {changeChecked(todoId, taskId)}

    const  removeTaskHandler = (taskId: string) => {removeTask(todoId, taskId)}

    const addTodoHandler = () =>{addTodo()}

    const removeTodoHandler = () =>{removeTodo(todoId)}

    return (
        <S.TodolistWrap>
            <Button title="X" callback={removeTodoHandler}/>
            <h3>{title}</h3>
            <Button title="+" callback={addTodoHandler}/>
            <S.InputWrap>
                <input
                    onChange={checkInputValue}
                    value={inputValue}
                    onKeyPress={inputKeyHandler}
                />
                <Button disabled={inputValidate(inputValue, 'button')} title="+" callback={addTaskHandler}/>
                {inputValidate(inputValue, 'message') && <span>Max task length 20 letters</span>}
            </S.InputWrap>
            <ul>
            {tasks.length !== 0 ?
                    tasks.map(task => {
                            return (
                                <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                    <input
                                        onChange={() => changeCheckedHandler(task.id)}
                                        type="checkbox"
                                        checked={task.isDone}
                                        />
                                    <span>{task.title}</span>
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
                <Button active={tasksFilter === 'completed'} title="Completed" callback={() => filterHandler('completed')}/>
            </S.ButtonWrap>
        </S.TodolistWrap>
    );
}
