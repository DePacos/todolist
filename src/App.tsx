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

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean,
}

export type TasksStateType = {
    [key:string]: Array<TasksType>
}

export const App = () => {

    const [todoLists, setTodoLists] = React.useState<Array<TodoListsType>>(todoDataLists)
    const [tasks, setTasks] = React.useState<TasksStateType>(tasksDataLists)

    const addTodo = () => {
        let id = v1()
        let newTasksLists = structuredClone(tasks)
        newTasksLists[id] = []
        setTodoLists([...todoLists, {id: id, title: 'Any Title', date: '', tasksFilter: 'all'}])
        setTasks(newTasksLists)
    }

    const removeTodoList = (todoId: string) => {
        setTodoLists(todoLists.filter(todo => todo.id !== todoId))
        delete tasks[todoId]
        setTasks({...tasks})
    }

    const addTask = (todoId: string, inputValue: string) => {
        setTasks({...tasks,
            [todoId]: [...tasks[todoId], {id: v1(), title: inputValue, isDone: false}]})
    }

    const changeChecked = (todoId: string, taskId: string) => {
        setTasks({...tasks,
            [todoId]: tasks[todoId].map(e => e.id === taskId ? {...e, isDone: !e.isDone} : e )})
    }

    const removeTask = (todoId: string, taskId: string) => {
        setTasks({...tasks,
            [todoId]: tasks[todoId].filter(task => task.id !== taskId)})
    }

    const changeFilter = (todoId: string, tasksFilter: Filter) => {
        const newTodosLists = todoLists.map(todo => todo.id === todoId ? {...todo, tasksFilter} : todo)
        setTodoLists(newTodosLists)
    }

    return (
        <div className="App">
            {todoLists.map(todo => {
                    return (
                        <Todolist
                            key={todo.id}
                            todoId={todo.id}
                            title={todo.title}
                            date={todo.date}
                            tasksFilter={todo.tasksFilter}
                            tasks={tasks}
                            changeFilter={changeFilter}
                            changeChecked={changeChecked}
                            addTask={addTask}
                            addTodo={addTodo}
                            removeTask={removeTask}
                            removeTodoList={removeTodoList}
                        />
                    )
                }
            )
            }`
        </div>
    );
}
