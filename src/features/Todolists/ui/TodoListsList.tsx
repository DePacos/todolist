import { useSelector } from "react-redux"
import { useAppDispatch } from "common/hooks"
import { todolistActions, } from "features/Todolists/model/todolistSlice"
import { Todolist } from "features/Todolists/ui/Todolist"
import React, { useEffect } from "react"
import { AddItemForm } from "common/components/AddItemForm/AddItemForm"
import { SM } from "app/styles/material-styles"
import Box from "@mui/material/Box"
import { Navigate } from "react-router-dom"
import { selectAuthIsLoggedIn } from "features/auth/model/authSelectors"
import { selectTodoLists } from "features/Todolists/model/todolistSelectors"

export const TodoListsList =() => {
  const todoLists = useSelector(selectTodoLists)
  const isLoggedIn = useSelector(selectAuthIsLoggedIn)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isLoggedIn) return
    dispatch(todolistActions.fetchTodolist())
  }, [])

  const createTodolist = (titleTodolist: string) => {
    return dispatch(todolistActions.createTodolist(titleTodolist))
  }

  if (!isLoggedIn) return <Navigate to={"/login"} />

  return (
    <>
      <Box sx={SM.wrapAddTodo}>
        <AddItemForm addItem={createTodolist} inputLabel="Todolist name" />
      </Box>
      <Box sx={SM.wrapTodoLists}>
        {todoLists.map((todo) => {
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
        })}
      </Box>
    </>
  )
}