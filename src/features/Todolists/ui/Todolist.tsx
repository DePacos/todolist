import React, { useEffect } from "react"
import { fetchTasks } from "features/Task/model/taskSlice"
import Paper from "@mui/material/Paper"
import { SM } from "app/styles/material-styles"
import { TasksList } from "features/Task/ui/TasksList"
import { useAppDispatch } from "common/hooks"
import { FilterTasksButtons } from "features/Todolists/ui/FilterTasksButtons"
import { TodolistTitle } from "features/Todolists/ui/TodolistTitle"

export const Todolist =
  ({ todoId, title, date, tasksFilter, entityStatus }: Props) => {
    const dispatch = useAppDispatch()

    console.log('entityStatus', entityStatus)

    useEffect(() => {
      dispatch(fetchTasks(todoId))
    }, [])

    return (
      <Paper elevation={6} sx={SM.wrapTodoList}>
       <TodolistTitle todoId={todoId} title={title} entityStatus={entityStatus}/>
        <TasksList todoId={todoId} tasksFilter={tasksFilter} entityStatus={entityStatus} />
        {date ? <div>{date}</div> : null}
        <FilterTasksButtons todoId={todoId} tasksFilter={tasksFilter}/>
      </Paper>
    )
  }

type Props = {
  todoId: string
  title: string
  date?: string
  order?: number
  tasksFilter: string
  entityStatus: string
}
