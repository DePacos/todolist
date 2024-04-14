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

    const getTodoItem = (todoId: number) => {
        return tasksData.filter(e => e.id === todoId)[0]
    }

    const updateTasksData = (todoId: number, todoItem: TaskDataType, ) =>{
        setTasks(tasksData.map(e => e.id === todoId ? todoItem : e))
    }

    const addTask = (todoId: number, inputValue: string) => {

        const todoItem = getTodoItem(todoId)
        todoItem.tasks = [...todoItem.tasks, {id: v1(), title: inputValue, isDone: false}]
        updateTasksData(todoId, todoItem)
    }

    const changeChecked = (todoId: number, taskId: string) => {
        const todoItem = getTodoItem(todoId)
        const changesTasks = todoItem.tasks.map(e => e.id === taskId ? {...e, isDone: !e.isDone} : e )
        todoItem.tasks = changesTasks
        updateTasksData(todoId, todoItem)
    }

    const removeTask = (todoId: number, taskId: string) => {

        const todoItem = getTodoItem(todoId)
        const changesTasks = todoItem.tasks.filter(task => task.id !== taskId)
        todoItem.tasks = changesTasks
        updateTasksData(todoId, todoItem)
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
            {tasksData.map(todoItem => {
                    const visibleTasks = (tasks: Array<TaskType>, tasksFilter: string) => {
                        if (tasksFilter === 'active') {
                            return tasks.filter(item => !item.isDone)
                        }
                        if (tasksFilter === 'completed') {
                            return tasks.filter(item => item.isDone)
                        }
                        return tasks
                    }
                    return (
                        <Todolist
                            key={todoItem.id}
                            todoId={todoItem.id}
                            title={todoItem.title}
                            date={todoItem.date}
                            tasksArr={visibleTasks(todoItem.tasks, todoItem.tasksFilter)}
                            tasksFilter={todoItem.tasksFilter}
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
