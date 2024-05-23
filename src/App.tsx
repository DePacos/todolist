import React from 'react';
import './App.css';
import {todoDataLists, tasksDataLists} from "./redux/data";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistReducer
} from "./model/todolist-reducer";
import {
    AddTaskAC,
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    RemoveTaskAC,
    taskReducer,
} from "./model/task-reducer"
import {v1} from "uuid";
import {Todolist} from "./components/Todolist";
import {AddItemForm} from "./components/AddItemForm";
import {Header} from "./components/Header";
import Box from "@mui/material/Box";
import {SM} from "../src/styles/material-styles";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export type Filter = 'all' | 'active' | 'completed'

type ThemeMode = 'dark' | 'light'

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
    [key: string]: Array<TasksType>
}

export const App = () => {
    const [themeMode, setThemeMode] = React.useState<ThemeMode>('light')

    const changeModeHandler = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#087EA4',
            },
        },
    })

    const [todoLists, dispatchTodolist] = React.useReducer(todolistReducer, todoDataLists)
    const [tasks, dispatchTask] = React.useReducer(taskReducer, tasksDataLists)

    const addTodolist = (titleTodolist: string) => {
        let id = v1()
        dispatchTask(AddTodolistAC(id))
        dispatchTodolist(AddTodolistAC(id, titleTodolist))
    }

    const removeTodoList = (todoId: string) => {
        dispatchTask(RemoveTodolistAC(todoId))
        dispatchTodolist(RemoveTodolistAC(todoId))
    }

    const addTask = (todoId: string, inputValue: string) => {
        dispatchTask(AddTaskAC(todoId, inputValue))
    }

    const changeTaskStatus = (todoId: string, taskId: string, isDone: boolean) => {
        dispatchTask(ChangeTaskStatusAC(todoId, taskId, isDone))
    }

    const changeTaskFilter = (todoId: string, tasksFilter: Filter) => {
        dispatchTodolist(ChangeTodolistFilterAC(todoId, tasksFilter))
    }

    const changeTaskTitle = (todoId: string, taskId: string, value: string) => {
        dispatchTask(ChangeTaskTitleAC(todoId, taskId, value))
    }

    const changeTitleTodolist = (todoId: string, titleValue: string) => {
        dispatchTodolist(ChangeTodolistTitleAC(todoId, titleValue))
    }

    const removeTask = (todoId: string, taskId: string) => {
        dispatchTask(RemoveTaskAC(todoId, taskId))
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="App">
                <Header theme={theme} changeModeHandler={changeModeHandler}/>
                <Box sx={SM.wrapAddTodo}>
                    <AddItemForm addItem={addTodolist}/>
                </Box>
                <Box sx={SM.wrapTodoLists}>
                    {todoLists.map(todo => {
                            return (
                                <Todolist
                                    key={todo.id}
                                    todoId={todo.id}
                                    title={todo.title}
                                    date={todo.date}
                                    tasksFilter={todo.tasksFilter}
                                    tasks={tasks}
                                    changeFilter={changeTaskFilter}
                                    changeChecked={changeTaskStatus}
                                    changeTitleTodo={changeTitleTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    addTask={addTask}
                                    removeTask={removeTask}
                                    removeTodoList={removeTodoList}
                                />
                            )
                        }
                    )
                    }
                </Box>
            </div>
        </ThemeProvider>
    );
}