import {todoListsAPI} from "../../api/todolistsAPI";
import {Dispatch} from "redux";



const initialState:TodoListsDomainType[] = []

export const todolistReducer = (state: TodoListsDomainType[] = initialState, action: ActionsTypes):TodoListsDomainType[]  => {
    switch (action.type){
        case 'ADD_TODOLIST':
            return [...state, {...action.payload.todolist, tasksFilter: 'all'}]
        case 'REMOVE_TODOLIST':
            return state.filter(todo => todo.id !== action.payload.todoId)
        case 'UPDATE_TODOLIST_TITLE':
            return state.map(todo => todo.id === action.payload.todoId ? {...todo, title: action.payload.todoTitle} : todo)
        case 'CHANGE_FILTER':
            return state.map(todo => todo.id === action.payload.todoId ? {...todo, tasksFilter: action.payload.filter} : todo)
        case "SET_TODOLIST":
            return  action.payload.todolist.map(todo => ({...todo, tasksFilter: action.payload.filter}))
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

export const changeTodolistFilterAC = (todoId: string, filter:string) =>
     ({type: 'CHANGE_FILTER', payload: {todoId, filter}} as const)

export const setTodolistAC = (todolist: TodoListsType[], filter: string = 'all') =>
     ({type: 'SET_TODOLIST', payload: {todolist, filter}} as const)

// thunks
export const todoListTC = () =>
    (dispatch: Dispatch) => {
        todoListsAPI.getTodolist()
            .then((res) => dispatch(setTodolistAC(res.data)))
    }

export const createTodolistTC = (title: string) =>
    (dispatch: Dispatch) => {
        todoListsAPI.createTodolist(title)
            .then((res) => dispatch(createTodolistAC(res.data.data.item)))
    }

export const removeTodolistTC = (todoId: string) =>
    (dispatch: Dispatch) => {
        todoListsAPI.removeTodolist(todoId)
            .then(() => dispatch(removeTodolistAC(todoId)))
    }

export const updateTodoListTitleTC = (todolistId: string, title: string) =>
    (dispatch: Dispatch) => {
        todoListsAPI.updateTodolist(todolistId, title)
            .then(() => dispatch(updateTodolistTitleAC(todolistId, title)))
    }


// types
// todo fix filter type

export type Filter = 'all' | 'active' | 'completed'

export type TodoListsDomainType = TodoListsType & {
    tasksFilter: string
}

export type TodoListsType = {
    id: string
    addedDate: string
    title: string
    order: number
}

type ActionsTypes =
    | ReturnType<typeof createTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof updateTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistAC>
