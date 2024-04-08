import React from 'react';
import {Button} from "./Button";
import {S} from "./Todolist_Styled";
import {Filter, TaskType} from "../App";



type TodolistProps = {
    todoId: number,
    title: string,
    date?: string,
    tasksArr: Array<TaskType>,
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
        changeChecked,
        addTask,
        removeTask,
    }:TodolistProps) => {

    const [inputValue, setInputValue] = React.useState('')

    const checkInputValue = (e:React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.currentTarget.value)
    }

    const inputKeyHandler = (e:React.KeyboardEvent<HTMLInputElement>) => {
            if(e.ctrlKey && e.code === 'Enter' && inputValue && inputValue.length <= 21){
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

    return (
        <S.TodolistWrap>
            <h3>{title}</h3>
            <S.InputWrap>
                <input
                    onChange={checkInputValue}
                    value={inputValue}
                    onKeyPress={inputKeyHandler}
                />
                <Button disabled={!inputValue || inputValue.length > 21} onClick={addTaskHandler}>+</Button>
                { inputValue.length > 21 && <span>Max task length 20 letters</span>}
            </S.InputWrap>
            <ul>
            {tasksArr.length !== 0 ?
                    tasksArr.map(item => {
                        const  changeCheckedHandler = () => {changeChecked(todoId, item.id)}
                        const  removeTaskHandler = () => {removeTask(todoId, item.id)}
                            return (
                                <li key={item.id}>
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
            {(date) ? <div>{date}</div> : null}
            <S.ButtonWrap>
                <Button onClick={() => filterHandler('all')}>All</Button>
                <Button onClick={() => filterHandler('active')}>Active</Button>
                <Button onClick={() => filterHandler('completed')}>Completed</Button>
            </S.ButtonWrap>
        </S.TodolistWrap>
    );
}
