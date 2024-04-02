import React from 'react';
import './App.css';
import {setInputValueType, Todolist} from "./components/Todolist";
import {data} from "./redux/data";



export type TaskType = {
    id: number,
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

    const addTask = (todoId: number, inputValue: string, setInputValue: setInputValueType) => {

        const copyTodosData:Array<TaskDataType> = structuredClone(tasksData)

        const newTodosData = copyTodosData.map(itemTodoData => {
            if(itemTodoData.id === todoId){
                itemTodoData.tasks.push(
                    {id: itemTodoData.tasks.length + 1, title: inputValue, isDone: false})
            }
            return itemTodoData
        })
            setInputValue('')
            setTasks(newTodosData)
    }

    const removeTask = (todoId: number, taskId: number) => {

        const copyTodosData:Array<TaskDataType> = structuredClone(tasksData)

        const newTodosData = copyTodosData.map(itemTodoData => {
            if(itemTodoData.id === todoId){
                itemTodoData.tasks = itemTodoData.tasks.filter(task => task.id !== taskId)
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
                            todoId={obj.id}
                            title={obj.title}
                            date={obj.date}
                            tasksArr={visibleTasks(obj.tasks, obj.tasksFilter)}
                            changeFilter={changeFilter}
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
