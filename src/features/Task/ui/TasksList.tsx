import { useAppDispatch } from "common/hooks"
import { useSelector } from "react-redux"
import { addTask, Tasks } from "features/Task/model/taskSlice"
import React from "react"
import { AddItemForm } from "common/components/AddItemForm/AddItemForm"
import List from "@mui/material/List"
import { Task } from "features/Task/ui/Task"
import { selectTasks } from "features/Task/model/tasksSelectors"
import { TaskStatuses } from "common/enums"

export const TasksList =
  ({ todoId, tasksFilter, entityStatus }: Props) => {
    const tasks = useSelector(selectTasks)[todoId]
    const dispatch = useAppDispatch()

    const createTasksHandler = (taskTitle: string) => {
      return dispatch(addTask({ todoId, taskTitle }))
    }

    const getTasksFilter = (tasks: Tasks[]) => {
      if (tasksFilter === "active") {
        return tasks.filter((task) => task.status === TaskStatuses.New)
      }

      if (tasksFilter === "completed") {
        return tasks.filter((task) => task.status === TaskStatuses.Completed)
      }
      return tasks
    }

    return (
      <>
        <AddItemForm
          addItem={createTasksHandler}
          inputLabel="Task name"
          disable={entityStatus === "loading"}
        />
        <List>
          {getTasksFilter(tasks).length !== 0 ? (
            getTasksFilter(tasks).map((task) => {
              return (
                <Task key={task.id} task={task} disable={entityStatus === "loading"} />
              )
            })
          ) : (
            <span>No Tasks</span>
          )}
        </List>
      </>
    )
  }

type Props = {
  todoId: string
  tasksFilter: string
  entityStatus: string
}
