import React from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {data} from "./redux/data";
import {v1} from "uuid";



export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export type Filter = 'all' | 'active' | 'completed'

export type TaskDataType = {
    id: number,
    title: string,
    date: string,
    tasks: Array<TaskType>,
    tasksFilter: string,
}

export const App = () => {
    const [tasksData, setTasks] = React.useState<Array<TaskDataType>>(data)

    const getCopyTodoData = () => {
        const copyTodoData:Array<TaskDataType> = structuredClone(tasksData)
        return copyTodoData
    }

    const addTask = (todoId: number, inputValue: string) => {

        const newTodosData = getCopyTodoData().map(itemTodoData => {
            if(itemTodoData.id === todoId){
                itemTodoData.tasks.push(
                    {id: v1(), title: inputValue, isDone: false})
            }
            return itemTodoData
        })
            setTasks(newTodosData)
    }

    const removeTask = (todoId: number, taskId: string) => {

        const newTodosData = getCopyTodoData().map(itemTodoData => {
            if(itemTodoData.id === todoId){
                itemTodoData.tasks = itemTodoData.tasks.filter(task => task.id !== taskId)
            }
            return itemTodoData
        })
            setTasks(newTodosData)
    }

    const changeChecked = (todoId: number, taskId: string) => {

        const newTodosData = getCopyTodoData().map(itemTodoData => {
            if(itemTodoData.id === todoId){
                itemTodoData.tasks.map(task => task.id === taskId ? task.isDone = !task.isDone : null)
            }
            return itemTodoData
        })
        setTasks(newTodosData)
    }

    const changeFilter = (todoId: number, filter: Filter) => {

        const newTodosData = [...tasksData].map(itemTodoData => {
            if (itemTodoData.id === todoId) {
                itemTodoData.tasksFilter = filter
            }
            return itemTodoData
        })
        setTasks(newTodosData)
    }

    return (
        <div className="App">
            {Object.values(tasksData).map(obj => {
                    const visibleTasks = (tasks: Array<TaskType>, tasksFilter: String) => {
                        if (tasksFilter === 'active') {
                            return tasks.filter(item => item.isDone === false)
                        }
                        if (tasksFilter === 'completed') {
                            return tasks.filter(item => item.isDone === true)
                        }
                        return tasks
                    }
                    return (
                        <Todolist
                            key={obj.id}
                            todoId={obj.id}
                            title={obj.title}
                            date={obj.date}
                            tasksArr={visibleTasks(obj.tasks, obj.tasksFilter)}
                            changeFilter={changeFilter}
                            changeChecked={changeChecked}
                            addTask={addTask}
                            removeTask={removeTask}
                        />
                    )
                }
            )
            }`
        </div>
    );
}
