import React from "react"
import { EditableSpan } from "common/components"
import IconButton from "@mui/material/IconButton"
import { SM } from "app/styles/material-styles"
import CancelIcon from "@mui/icons-material/Cancel"
import { todolistActions } from "features/Todolists/model/todolistSlice"
import { useAppDispatch } from "common/hooks"

export const TodolistTitle = ({todoId, title, entityStatus}: Props) => {

  const dispatch = useAppDispatch()

  const updateTodolistTitle = (title: string) => {
    dispatch(todolistActions.updateTodolistTitle({ todoId, title }))
  }

  const removeTodoList = () => {
    dispatch(todolistActions.removeTodolist(todoId))
  }

  return (
    <>
      <h2>
        <EditableSpan
          title={title}
          onChange={updateTodolistTitle}
          disable={entityStatus === "loading"}
        />
      </h2>
      <IconButton
        sx={SM.closeTodo}
        onClick={removeTodoList}
        disabled={entityStatus === "loading"}
      >
        <CancelIcon />
      </IconButton>
    </>
  )
}

type Props = {
  todoId: string
  title: string
  entityStatus: string
}
