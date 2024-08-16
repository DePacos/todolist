import { TodoLists } from "features/Todolists/model/todolistSlice"
import { BaseResponse } from "common/types"
import { instance } from "common/instance"

export const tasksAPI = {
  getTodolist() {
    return instance.get<TodoLists[]>(`todo-lists`)
  },

  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: TodoLists }>>("todo-lists", { title })
  },

  updateTodolist(todoId: string, title: string) {
    return instance.put<BaseResponse>(`todo-lists/${todoId}`, { title })
  },

  removeTodolist(todoID: string) {
    return instance.delete<BaseResponse>(`todo-lists/${todoID}`)
  },
}
