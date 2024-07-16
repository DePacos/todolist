import {useSelector} from "react-redux";
import {AppRootState, useAppDispatch} from "../../store/store";
import {createTodolistTC, TodoListsDomainType, getTodoListTC} from "../../store/reducers/todolist-reducer";
import {Todolist} from "./Todolist";
import React, {useEffect} from "react";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {SM} from "../../styles/material-styles";
import Box from "@mui/material/Box";
import {Navigate} from "react-router-dom";


export const TodoListsList = React.memo(() => {
    const todoLists = useSelector<AppRootState, TodoListsDomainType[]>(state => state.todolists)
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isLoggedIn) return
        dispatch(getTodoListTC())

    }, [])

    const createTodolist = React.useCallback((titleTodolist: string) => {
        dispatch(createTodolistTC(titleTodolist))
    }, [])

    if (!isLoggedIn) return <Navigate to={'/login'} />

    return (
        <>
            <Box sx={SM.wrapAddTodo}>
                <AddItemForm addItem={createTodolist} inputLabel='Todolist name'/>
            </Box>
            <Box sx={SM.wrapTodoLists}>
                {
                    todoLists.map(todo => {
                            return (
                                <Todolist
                                    key={todo.id}
                                    todoId={todo.id}
                                    title={todo.title}
                                    date={todo.addedDate}
                                    order={todo.order}
                                    tasksFilter={todo.tasksFilter}
                                    entityStatus={todo.entityStatus}
                                />
                            )
                        }
                    )
                }
            </Box>
        </>
    )
})