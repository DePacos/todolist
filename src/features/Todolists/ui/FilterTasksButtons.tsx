import React from "react"
import Box from "@mui/material/Box"
import { SM } from "app/styles/material-styles"
import { BasicButton } from "common/components"
import { Filter, todolistActions } from "features/Todolists/model/todolistSlice"
import { useAppDispatch } from "common/hooks"

export const FilterTasksButtons = ({todoId, tasksFilter}: Props) => {

  const dispatch = useAppDispatch()

  const filterTasksHandler = (filter: Filter) => {
    dispatch(todolistActions.changeTodolistFilter({ todoId, filter }))
  }

  const renderButtons = () => {
    const statusArr = ['all', 'active', 'completed']
      return statusArr.map((status, i) => {
        return(
        <BasicButton key={i}
          variant={tasksFilter === status ? "outlined" : "contained"}
          color={"success"}
          title={status}
          onClick={() => {filterTasksHandler(status as Filter)}}
        />
          )
      })
  }

  return (
    <Box sx={SM.wrapStatusBtn}>
      {renderButtons()}
    </Box>
  )
}

type Props = {
  todoId: string
  tasksFilter: string
}