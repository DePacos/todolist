import React from "react"
import ListItem from "@mui/material/ListItem"
import Checkbox from "@mui/material/Checkbox"
import DoneOutlineIcon from "@mui/icons-material/DoneOutline"
import { SM } from "app/styles/material-styles"
import { EditableSpan } from "common/components"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { removeTask, Tasks, updateTask } from "features/Task/model/taskSlice"
import { useAppDispatch } from "common/hooks"
import { TaskStatuses } from "common/enums"

export const Task = ({ task, disable }: Props) => {
  const dispatch = useAppDispatch()

  const updateTaskHandler = (
    taskProperty: TaskProperty,
    taskValue: string | number,
  ) => {
    dispatch(
      updateTask({
        todoId: task.todoListId,
        taskId: task.id,
        domainModel:
          taskProperty === "title"
            ? { title: taskValue as string }
            : taskProperty === "status"
              ? { status: taskValue as number }
              : {},
      }),
    )
  }

  const removeTaskHandler = () => {
    dispatch(removeTask({ todoId: task.todoListId, taskId: task.id }))
  }

  return (
    <ListItem key={task.id} className="test" sx={SM.taskItem(task.status)}>
      <Checkbox
        onChange={() =>
          updateTaskHandler(
            "status",
            task.status === TaskStatuses.New
              ? TaskStatuses.Completed
              : TaskStatuses.New,
          )
        }
        color={"success"}
        checked={!!task.status}
        checkedIcon={<DoneOutlineIcon />}
        disabled={disable}
      />
      <EditableSpan
        title={task.title}
        onChange={(taskTitle: string) => updateTaskHandler("title", taskTitle)}
      />
      <IconButton onClick={removeTaskHandler} disabled={disable}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}

type Props = {
  task: Tasks
  disable?: boolean
}

type TaskProperty =
  | "title"
  | "description"
  | "status"
  | "priority"
  | "startsDate"
  | "deadLine"
