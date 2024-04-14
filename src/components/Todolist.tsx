import React from 'react';
import {Button} from "./Button";
import {S} from "./Todolist_Styled";
import {Filter, TaskType} from "../App";



type TodolistProps = {
    todoId: number,
    title: string,
    date?: string,
    tasksArr: Array<TaskType>,
    tasksFilter: string,
    changeFilter: (todoId: number, filter:Filter) => void,
    changeChecked: (todoId: number, taskId: string) => void,
    addTask: (todoId: number, inputValue: string) => void,
    removeTask: (todoId: number, taskId: string) => void,
}

export const Todolist = (
    {
        todoId,
        title,
        date,
        tasksArr,
        changeFilter,
        tasksFilter,
        changeChecked,
        addTask,
        removeTask,
    }:TodolistProps) => {

    const [inputValue, setInputValue] = React.useState('')

    const checkInputValue = (e:React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.currentTarget.value)
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

    const filterHandler = (filter: Filter) =>{
        changeFilter(todoId, filter)
    }

    const inputValidate = (inValue: string, typeValidate: string, e?:React.KeyboardEvent<HTMLInputElement>) => {
        let checkInputLength = inValue.length < 21
        let checkInputSpace = inValue.trim() === ''

        if(typeValidate === 'button'){
            if(!inValue || !checkInputLength || checkInputSpace){return true}
        }

        if(typeValidate === 'keyBoard'){
            if(e?.ctrlKey && e?.code === 'Enter' && inputValue && !checkInputLength && !checkInputSpace){return true}
        }

        if(typeValidate === 'message'){
           return !checkInputLength
        }

        return false
    }

    return (
        <S.TodolistWrap>
            <h3>{title}</h3>
            <S.InputWrap>
                <input
                    onChange={checkInputValue}
                    value={inputValue}
                    onKeyPress={inputKeyHandler}
                />
                <Button disabled={inputValidate(inputValue, 'button')} onClick={addTaskHandler}>+</Button>
                {inputValidate(inputValue, 'message') && <span>Max task length 20 letters</span>}
            </S.InputWrap>
            <ul>
            {tasksArr.length !== 0 ?
                    tasksArr.map(item => {
                        const  changeCheckedHandler = () => {changeChecked(todoId, item.id)}
                        const  removeTaskHandler = () => {removeTask(todoId, item.id)}
                            return (
                                <li key={item.id} className={item.isDone ? 'is-done' : ''}>
                                    <input
                                        onChange={changeCheckedHandler}
                                        type="checkbox"
                                        checked={item.isDone}
                                        />
                                    <span>{item.title}</span>
                                    <Button onClick={removeTaskHandler}>X</Button>
                                </li>
                            )
                        })
                        : <span>No Tasks</span>
                }
            </ul>
            {date ? <div>{date}</div> : null}
            <S.ButtonWrap>
                <Button active={tasksFilter === 'all'} onClick={() => filterHandler('all')}>All</Button>
                <Button active={tasksFilter === 'active'} onClick={() => filterHandler('active')}>Active</Button>
                <Button active={tasksFilter === 'completed'} onClick={() => filterHandler('completed')}>Completed</Button>
            </S.ButtonWrap>
        </S.TodolistWrap>
    );
}
