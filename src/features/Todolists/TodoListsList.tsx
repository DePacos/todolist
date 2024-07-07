import {useSelector} from "react-redux";
import {AppRootState, useAppDispatch} from "../../store/store";
import {createTodolistTC, TodoListsDomainType, todoListTC} from "../../store/reducers/todolist-reducer";
import {Todolist} from "./Todolist";
import React, {useEffect} from "react";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {SM} from "../../styles/material-styles";
import Box from "@mui/material/Box";

export const TodoListsList = React.memo(() => {
    const todoLists = useSelector<AppRootState, TodoListsDomainType[]>(state => state.todolists)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(todoListTC())
    }, [])

    const createTodolist = React.useCallback((titleTodolist: string) => {
        dispatch(createTodolistTC(titleTodolist))
    }, [])

    return (
        <>
            <Box sx={SM.wrapAddTodo}>
                <AddItemForm addItem={createTodolist}/>
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
                                />
                            )
                        }
                    )
                }
            </Box>
        </>
    )
})