import {
    changeTodolistStatusAC,
    ChangeTodolistStatusType,
    createTodolistAC,
    removeTodolistAC,
    setTodolistAC,
} from "./todolist-reducer"
import {Dispatch} from "redux";
import {AppRootState} from "../store";
import {todoListsAPI} from "../../api/todolistsAPI";
import {SetAppErrorType, setAppErrorAC, setAppStatusAC, SetAppStatusType} from "./app-reducers";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";



const initialState: TasksStateType = {}

export const taskReducer = (state: TasksStateType = initialState, action: ActionsTypes): TasksStateType => {
    switch (action.type) {
        case 'ADD_TODOLIST':
            return {...state, [action.payload.todolist.id]: []}
        case 'REMOVE_TODOLIST':
            return (({[action.payload.todoId]: _, ...rest}) => rest)(state)
        case 'ADD_TASK':
            return {...state, [action.payload.task.todoListId]: [...state[action.payload.task.todoListId], action.payload.task]}
        case 'REMOVE_TASK':
            return {...state, [action.payload.todoId]: state[action.payload.todoId]
                    .filter(el => el.id !== action.payload.taskId)}
        case 'UPDATE_TASK':
            return {...state, [action.payload.todoId]: state[action.payload.todoId]
                    .map(el => el.id === action.payload.taskId ? {...el, ...action.payload.apiModel}: el)}
        case 'SET_TODOLIST':
            return action.payload.todolist.reduce((acc, current) => {
                    acc[current.id] = []
                    return acc
                }, state)
        case 'SET_TASKS':
            return {...state, [action.payload.todoId]: action.payload.tasks}
        default:
            return state
    }
}


// actions
export const createTaskAC = (task: TasksType) =>
    ({type: 'ADD_TASK', payload: {task}} as const)

export const removeTaskAC = (todoId: string, taskId: string) =>
    ({type: 'REMOVE_TASK', payload: {todoId, taskId,}} as const)

export const updateTaskAC = (todoId:string, taskId: string, apiModel: UpdateDomainTaskType) =>
    ({type: 'UPDATE_TASK', payload: {todoId, taskId, apiModel}} as const)

export const setTasksAC = (todoId: string, tasks: TasksType[]) =>
     ({type: 'SET_TASKS', payload: {todoId, tasks}} as const)


// thunks
export const getTaskTC = (todoId: string) => (dispatch: Dispatch<ActionsTypes | SetAppStatusType>) => {
    dispatch(setAppStatusAC('loading'))
    todoListsAPI.getTasks(todoId)
        .then((res) => {
            dispatch(setTasksAC(todoId, res.data.items))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => handleServerNetworkError(error, dispatch))
}

export const createTaskTC = (todoId: string, title: string) =>
    (dispatch: Dispatch<ActionsTypes | SetAppErrorType | SetAppStatusType>) => {
        dispatch(setAppStatusAC('loading'))
        todoListsAPI.createTask(todoId, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(createTaskAC(res.data.data.item))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch(error => handleServerNetworkError(error, dispatch))
    }

export const removeTaskTC = (todoId: string, taskId: string) =>
    (dispatch: Dispatch<ActionsTypes | SetAppStatusType | ChangeTodolistStatusType>) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTodolistStatusAC(todoId, 'loading'))
        todoListsAPI.removeTask(todoId, taskId)
            .then(() => {
                    dispatch(removeTaskAC(todoId, taskId))
                    dispatch(setAppStatusAC('succeeded'))
                    dispatch(changeTodolistStatusAC(todoId, 'idle'))
                }
            )
            .catch(error => handleServerNetworkError(error, dispatch))
    }

export const updateTaskTC = (todoId: string, taskId: string, domainModel: UpdateDomainTaskType) =>
    (dispatch: Dispatch<ActionsTypes | SetAppStatusType | SetAppErrorType>, getState: () => AppRootState) => {
        const task = getState().tasks[todoId].find(task => task.id === taskId)
        const apiModel =
            {
                title: task!.title,
                description: task!.description,
                status: task!.status,
                priority: task!.priority,
                startDate: task!.startDate,
                deadline: task!.deadline,
                ...domainModel
            }
        dispatch(setAppStatusAC('loading'))
        todoListsAPI.updateTask(todoId, taskId, apiModel)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC(todoId, taskId, apiModel))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }


// types
export enum TaskStatuses  {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}

export type TasksStateType = {
    [key: string]: TasksType[]
}

export type TasksType = {
    id: string
    title: string
    description: string | null
    todoListId: string
    order: number
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string | null
    deadline: string | null
    addedDate: string
}

export type UpdateDomainTaskType = {
    title?: string
    description?: string | null
    status?: number
    priority?: number
    startDate?: string | null
    deadline?: string | null
}

type ActionsTypes =
    | ReturnType<typeof createTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof createTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistAC>