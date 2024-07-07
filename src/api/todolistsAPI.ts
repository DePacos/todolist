import axios from "axios";
import {TodoListsType} from "../store/reducers/todolist-reducer";
import {TasksType} from "../store/reducers/task-reducer";


export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {'API-KEY':'b30b7bb6-50d0-48c1-a6fd-b3a9c7548470'},
})

export const todoListsAPI = {
    getTodolist() {
        return instance.get<TodoListsType[]>(`todo-lists`)
    },

    createTodolist(title: string){
        return instance.post<ResponseType<{item: TodoListsType}>>('todo-lists', {title})
    },

    updateTodolist(todoId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todoId}`, {title})
    },

    removeTodolist(todoID: string){
        return instance.delete<ResponseType>(`todo-lists/${todoID}`)
    },

    getTasks(todoId:string) {
        return instance.get<GetTasksType>(`todo-lists/${todoId}/tasks`)
    },

    createTask(todoId:string, title:string) {
        return instance.post<ResponseType<{item: TasksType}>>(`todo-lists/${todoId}/tasks`, {title})
    },

    updateTask(todoId:string, taskId:string, model:UpdateTaskModelType) {
        return instance.put<UpdateTaskModelType>(`todo-lists/${todoId}/tasks/${taskId}`, model)
    },

    removeTask(todoId:string, taskId:string = '') {
        return instance.delete<ResponseType>(`todo-lists/${todoId}/tasks/${taskId}`)
    },
}


// types
export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: D
}

export type UpdateTaskModelType = {
    title: string
    description: string | null
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
}

export type GetTasksType = {
    error: string | null
    totalCount: number
    items: TasksType[]
}
