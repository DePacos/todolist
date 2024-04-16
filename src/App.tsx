import React from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {todoDataLists, tasksDataLists} from "./redux/data";
import {v1} from "uuid";



export type Filter = 'all' | 'active' | 'completed'

export type TodoListsType = {
    id: string,
    title: string,
    date: string,
    tasksFilter: string,
}

export type TasksListsType = {
    id: string,
    title: string,
    isDone: boolean,
}

type TasksType = {
    [key:string]: Array<TasksListsType>
}

export const App = () => {

    const [todoLists, setTodoLists] = React.useState<Array<TodoListsType>>(todoDataLists)
    const [tasksLists, setTasksLists] = React.useState<TasksType>(tasksDataLists)

    const addTodo = () => {
        let id = v1()
        let newTasksLists = structuredClone(tasksLists)
        newTasksLists[id] = []
        setTodoLists([...todoLists, {id: id, title: 'Any Title', date: '', tasksFilter: 'all'}])
        setTasksLists(newTasksLists)
    }

    const removeTodo = (todoId: string) => {
        setTodoLists(todoLists.filter(todo => todo.id !== todoId))
    }

    const addTask = (todoId: string, inputValue: string) => {
        let newTasksLists = structuredClone(tasksLists)
        newTasksLists[todoId] = [...tasksLists[todoId], {id: v1(), title: inputValue, isDone: false}]
        setTasksLists(newTasksLists)
    }

    const changeChecked = (todoId: string, taskId: string) => {
        let newTasksLists = structuredClone(tasksLists)
        newTasksLists[todoId] = tasksLists[todoId].map(e => e.id === taskId ? {...e, isDone: !e.isDone} : e )
        setTasksLists(newTasksLists)
    }

    const removeTask = (todoId: string, taskId: string) => {
        let newTasksLists = structuredClone(tasksLists)
        newTasksLists[todoId] = tasksLists[todoId].filter(task => task.id !== taskId)
        setTasksLists(newTasksLists)
    }

    const changeFilter = (todoId: string, filter: Filter) => {
        const newTodosLists = todoLists.map(todo => {
            if (todo.id === todoId) {
                todo.tasksFilter = filter
            }
            return todo
        })
        setTodoLists(newTodosLists)
    }

    return (
        <div className="App">
            {todoLists.map(todo => {
                    const visibleTasks = (tasks: Array<TasksListsType>, tasksFilter: string) => {
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
                            key={todo.id}
                            todoId={todo.id}
                            title={todo.title}
                            date={todo.date}
                            tasksFilter={todo.tasksFilter}
                            tasks={visibleTasks(tasksLists[todo.id], todo.tasksFilter)}
                            changeFilter={changeFilter}
                            changeChecked={changeChecked}
                            addTask={addTask}
                            addTodo={addTodo}
                            removeTask={removeTask}
                            removeTodo={removeTodo}
                        />
                    )
                }
            )
            }`
        </div>
    );
}
