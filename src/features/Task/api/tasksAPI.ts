import { BaseResponse } from "common/types"
import { Tasks } from "features/Task/model/taskSlice"
import { instance } from "common/instance"

export const tasksAPI = {

  getTasks(todoId: string) {
    return instance.get<GetTasks>(`todo-lists/${todoId}/tasks`)
  },

  createTask(todoId: string, title: string) {
    return instance.post<BaseResponse<{ item: Tasks }>>(
      `todo-lists/${todoId}/tasks`, { title },
    )
  },

  updateTask(todoId: string, taskId: string, model: UpdateTaskModel) {
    return instance.put<BaseResponse<{ item: Tasks }>>(
      `todo-lists/${todoId}/tasks/${taskId}`, model,)
  },

  removeTask(todoId: string, taskId: string = "") {
    return instance.delete<BaseResponse>(`todo-lists/${todoId}/tasks/${taskId}`)
  },
}

export type UpdateTaskModel = {
  title: string
  description: string | null
  status: number
  priority: number
  startDate: string | null
  deadline: string | null
}

export type GetTasks = {
  error: string | null
  totalCount: number
  items: Tasks[]
}
