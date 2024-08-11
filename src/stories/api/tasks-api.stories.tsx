import React, { useState } from "react"
import { Tasks } from "features/Task/taskSlice"
import { BaseResponse } from "common/types/commonTypes"
import { tasksAPI, GetTasks } from "features/Task/tasksAPI"

export default {
  title: "API/Tasks"
}

export const FetchTasks = () => {
  const [taskTitle, setTaskTitle] = useState("")
  const [state, setState] = useState<GetTasks>({
    error: "error",
    totalCount: 0,
    items: []
  })

  const getTasksHandler = () => {
    tasksAPI.getTasks(taskTitle).then((res) => {
      setState(res.data)
    })
  }

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        TodoId:{" "}
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTaskTitle(e.currentTarget.value)
          }
          value={taskTitle}
        />
        <button onClick={getTasksHandler}>GetTasks</button>
      </div>
    </div>
  )
}

export const CreateTask = () => {
  const [todoId, setSetTodoId] = useState("")
  const [taskTitle, setTaskTitle] = useState("")
  const [state, setState] = useState<BaseResponse>({
    resultCode: 111,
    messages: ["test message"],
    fieldsErrors: [{field: 'field', error: 'error',}],
    data: {}
  })

  const createTaskHandler = () => {
    tasksAPI.createTask(todoId, taskTitle).then((res) => {
      setState(res.data)
    })
  }

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        TodoId:{" "}
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSetTodoId(e.currentTarget.value)
          }
          value={todoId}
        />
        Task title:{" "}
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTaskTitle(e.currentTarget.value)
          }
          value={taskTitle}
        />
        <button onClick={createTaskHandler}>CreateTask</button>
      </div>
    </div>
  )
}

export const DeleteTask = () => {
  const [todoId, setTodoId] = useState("")
  const [taskId, setTaskId] = useState("")
  const [state, setState] = useState<BaseResponse>({
    resultCode: 111,
    messages: ["test message"],
    fieldsErrors: [{field: 'field', error: 'error',}],
    data: {}
  })

  const deleteTaskHandler = () => {
    tasksAPI.removeTask(todoId, taskId).then((res) => {
      setState(res.data)
    })
  }

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        TodoId:{" "}
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTodoId(e.currentTarget.value)
          }
          value={todoId}
        />
        TaskId:{" "}
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTaskId(e.currentTarget.value)
          }
          value={taskId}
        />
        <button onClick={deleteTaskHandler}>DeleteTask</button>
      </div>
    </div>
  )
}

export const UpdateTask = () => {
  const [todoId, setTodoId] = useState("")
  const [taskId, setTaskId] = useState("")
  const [updateValue, setUpdateValue] = useState("")
  const [state, setState] = useState<Tasks>({
    id: "111",
    title: "title",
    description: "description",
    todoListId: "todoListId",
    order: 1,
    status: 1,
    priority: 1,
    startDate: "2020",
    deadline: "deadline",
    addedDate: "addedDate"
  })

  const model = {
    title: "title",
    description: "description",
    status: 1,
    priority: 1,
    startDate: "startDate",
    deadline: "deadline"
  }

  const updateTaskHandler = () => {
    tasksAPI
      .updateTask(todoId, taskId, { ...model, description: updateValue })
      .then((res) => {
        setState(res.data.data.item)
      })
  }

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        TodoId:{" "}
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTodoId(e.currentTarget.value)
          }
          value={todoId}
        />
        TaskId:{" "}
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTaskId(e.currentTarget.value)
          }
          value={taskId}
        />
        Update Value:{" "}
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUpdateValue(e.currentTarget.value)
          }
          value={updateValue}
        />
        <button onClick={updateTaskHandler}>UpdateTask</button>
      </div>
    </div>
  )
}
