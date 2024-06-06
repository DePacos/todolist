import React from 'react';
import './App.css';
import {
    AddTodolistAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
} from "./model/todolist-reducer";
import {v1} from "uuid";
import {Todolist} from "./components/Todolist";
import {AddItemForm} from "./components/AddItemForm";
import {Header} from "./components/Header";
import Box from "@mui/material/Box";
import {SM} from "../src/styles/material-styles";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./redux/store";

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

    const changeModeHandler = React.useCallback(() => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }, [themeMode])

    const theme =  React.useMemo(() => {
        return createTheme({
            palette: {
                mode: themeMode === 'light' ? 'light' : 'dark',
                primary: {
                    main: '#087EA4',
                },
            },
        })
    }, [themeMode])

    const todoLists = useSelector<AppRootState, Array<TodoListsType>>(state => state.todolists)
    const dispatch = useDispatch()

    const addTodolist = React.useCallback((titleTodolist: string) => {
        let id = v1()
        dispatch(AddTodolistAC(id, titleTodolist))
    }, [])

    const removeTodoList = React.useCallback( (todoId: string) => {
        dispatch(RemoveTodolistAC(todoId))
    }, [])

    const changeTitleTodolist = React.useCallback((todoId: string, titleValue: string) => {
        dispatch(ChangeTodolistTitleAC(todoId, titleValue))
    }, [])

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
                                    changeTitleTodo={changeTitleTodolist}
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