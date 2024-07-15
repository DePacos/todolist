import {todoListsAPI} from "../../api/todolistsAPI";
import {Dispatch} from "redux";
import {SetAppStatusType, setAppStatusAC, RequestStatusType} from "./app-reducers";
import {handleServerNetworkError} from "../../utils/error-utils";


const initialState:TodoListsDomainType[] = []

export const todolistReducer = (state: TodoListsDomainType[] = initialState, action: ActionsTypes):TodoListsDomainType[]  => {
    switch (action.type){
        case 'ADD_TODOLIST':
            return [...state, {...action.payload.todolist, tasksFilter: 'all', entityStatus: "idle"}]
        case 'REMOVE_TODOLIST':
            return state.filter(todo => todo.id !== action.payload.todoId)
        case 'UPDATE_TODOLIST_TITLE':
            return state.map(todo => todo.id === action.payload.todoId ? {...todo, title: action.payload.todoTitle} : todo)
        case 'CHANGE_FILTER':
            return state.map(todo => todo.id === action.payload.todoId ? {...todo, tasksFilter: action.payload.filter} : todo)
        case 'CHANGE_STATUS':
            return state.map(todo => todo.id === action.payload.todoId ? {...todo, entityStatus: action.payload.status} : todo)
        case "SET_TODOLIST":
            return  action.payload.todolist.map(todo => ({...todo, tasksFilter: action.payload.filter, entityStatus: 'idle'}))
        default:
            return state
    }
}

// actions
export const createTodolistAC = (todolist: TodoListsType) =>
    ({type: 'ADD_TODOLIST', payload: {todolist}} as const)

export const removeTodolistAC = (todoId: string) =>
    ({type: 'REMOVE_TODOLIST', payload: {todoId}} as const)

export const updateTodolistTitleAC = (todoId: string, todoTitle: string) =>
    ({type: 'UPDATE_TODOLIST_TITLE', payload: {todoId, todoTitle}}  as const)

export const changeTodolistFilterAC = (todoId: string, filter: Filter) =>
     ({type: 'CHANGE_FILTER', payload: {todoId, filter}} as const)

export const changeTodolistStatusAC = (todoId: string, status: RequestStatusType) =>
     ({type: 'CHANGE_STATUS', payload: {todoId, status}} as const)

export const setTodolistAC = (todolist: TodoListsType[], filter: Filter = 'all') =>
     ({type: 'SET_TODOLIST', payload: {todolist, filter}} as const)

// thunks
export const getTodoListTC = () =>
    (dispatch: Dispatch<ActionsTypes | SetAppStatusType>) => {
        dispatch(setAppStatusAC('loading'))
        todoListsAPI.getTodolist()
            .then((res) =>
                dispatch(setTodolistAC(res.data),
                dispatch(setAppStatusAC('succeeded'))
                ))
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }

export const createTodolistTC = (title: string) =>
    (dispatch: Dispatch<ActionsTypes | SetAppStatusType>) => {
        dispatch(setAppStatusAC('loading'))
        todoListsAPI.createTodolist(title)
            .then((res) => {
                dispatch(createTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }

export const removeTodolistTC = (todoId: string) =>
    (dispatch: Dispatch<ActionsTypes | SetAppStatusType>) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTodolistStatusAC(todoId, 'loading'))
        todoListsAPI.removeTodolist(todoId)
            .then(() => {
                dispatch(removeTodolistAC(todoId))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch(error => {
                handleServerNetworkError(error,dispatch)
            })
    }

export const updateTodoListTitleTC = (todoId: string, title: string) =>
    (dispatch: Dispatch<ActionsTypes | SetAppStatusType>) => {
        dispatch(setAppStatusAC('loading'))
        todoListsAPI.updateTodolist(todoId, title)
            .then(() => {
                dispatch(updateTodolistTitleAC(todoId, title))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch(error => handleServerNetworkError(error, dispatch))
    }

// types
export type Filter = 'all' | 'active' | 'completed'

export type TodoListsDomainType = TodoListsType & {
    tasksFilter: Filter
    entityStatus: RequestStatusType
}

export type TodoListsType = {
    id: string
    addedDate: string
    title: string
    order: number
}

export type ChangeTodolistStatusType = ReturnType<typeof changeTodolistStatusAC>

type ActionsTypes =
    | ReturnType<typeof createTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof updateTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistAC>
    | ChangeTodolistStatusType
