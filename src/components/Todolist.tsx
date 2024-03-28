import React from 'react';
import {Button} from "./Button";
import {S} from "./Todolist_Styled";

export type TaskProps = {
    id: number,
    title: string,
    isDone: boolean,
}

type TodolistProps = {
    title: string,
    propsTask: Array<TaskProps>,
    data?: string,
}

type Filter = 'all' | 'active' | 'completed'

export const Todolist = ({title, propsTask, data}: TodolistProps) => {
    const [inputValue, setInputValue] = React.useState('')
    const [tasks, setTasks] = React.useState<Array<TaskProps>>(propsTask)
    const [tasksFilter, setTasksFilter] = React.useState<Filter>('all')

    const checkInputValue = (e:any) => {
            setInputValue(e.target.value)
    }

    const addTask = () => {
    let newTasks = [...tasks]
        newTasks.push({id: tasks.length + 1, title: inputValue, isDone: false})
        setTasks(newTasks)
    }

    const removeTask = (id:number) => {
        const changeTasks = tasks.filter((item) => item.id !== id)
        setTasks(changeTasks)
    }

    const visibleTasks = () =>{
        if(tasksFilter === 'active'){
            return tasks.filter(item => item.isDone === false)
        }
        if(tasksFilter === 'completed'){
            return tasks.filter(item => item.isDone === true)
        }
        return tasks
    }

    return (
        <S.TodolistWrap>
            <h3>{title}</h3>
            <S.InputWrap>
                <input  onChange={e => checkInputValue(e)} value={inputValue}/>
                <Button onClick={addTask}>+</Button>
            </S.InputWrap>
            <ul>
                {(visibleTasks().length !== 0 ?
                        visibleTasks().map(item => {
                            return (
                                <li key={item.id}>
                                    <input
                                        type="checkbox"
                                        checked={item.isDone}
                                        />
                                    <span>{item.title}</span>
                                    <Button onClick={() => removeTask(item.id)}>X</Button>
                                </li>
                            )
                        })
                        : <span>No Tasks</span>
                )
                }
            </ul>
            {(data) ? <div>{data}</div> : null}
            <S.ButtonWrap>
                <Button onClick={() => setTasksFilter('all')}>All</Button>
                <Button onClick={() => setTasksFilter('active')}>Active</Button>
                <Button onClick={() => setTasksFilter('completed')}>Completed</Button>
            </S.ButtonWrap>
        </S.TodolistWrap>
    );
}
