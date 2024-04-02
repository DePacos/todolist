import React from 'react';
import {Button} from "./Button";
import {S} from "./Todolist_Styled";
import {Filter, TaskType} from "../App";



export type setInputValueType = React.Dispatch<React.SetStateAction<string>>

type TodolistProps = {
    todoId: number,
    title: string,
    date?: string,
    tasksArr: Array<TaskType>,
    changeFilter: (todoId: number, filter:Filter) => void,
    addTask: (todoId: number, inputValue: string, setInputValue: setInputValueType) => void,
    removeTask: (todoId: number, taskId: number) => void,
}

export const Todolist = (
    {
        todoId,
        title,
        date,
        tasksArr,
        changeFilter,
        addTask,
        removeTask,
    }:TodolistProps) => {

    const [inputValue, setInputValue] = React.useState('')

    const checkInputValue = (e:React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value)
    }

    return (
        <S.TodolistWrap>
            <h3>{title}</h3>
            <S.InputWrap>
                <input onChange={checkInputValue} value={inputValue}/>
                <Button onClick={() => addTask(todoId, inputValue, setInputValue)}>+</Button>
            </S.InputWrap>
            <ul>
                {tasksArr.length !== 0 ?
                    tasksArr.map(item => {
                            return (
                                <li key={item.id}>
                                    <input
                                        type="checkbox"
                                        checked={item.isDone}
                                        />
                                    <span>{item.title}</span>
                                    <Button onClick={() => removeTask(todoId, item.id)}>X</Button>
                                </li>
                            )
                        })
                        : <span>No Tasks</span>
                }
            </ul>
            {(date) ? <div>{date}</div> : null}
            <S.ButtonWrap>
                <Button onClick={() => changeFilter(todoId, 'all')}>All</Button>
                <Button onClick={() => changeFilter(todoId,'active')}>Active</Button>
                <Button onClick={() => changeFilter(todoId,'completed')}>Completed</Button>
            </S.ButtonWrap>
        </S.TodolistWrap>
    );
}
