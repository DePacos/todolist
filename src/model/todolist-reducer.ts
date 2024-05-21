import {TodoListsType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE_TODOLIST'
    payload: {
        id: string
    }
}
export type AddTodolistActionType = {
    type: 'ADD_TODOLIST'
    payload: {
        id: string
        title: string
    }
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE_TODOLIST_TITLE'
    payload: {
        id: string
        title: string
    }
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE_FILTER'
    payload: {
        id: string
        filter: string,
    },
}

export type ActionsTypes =
    RemoveTodolistActionType |
    AddTodolistActionType |
    ChangeTodolistTitleActionType |
    ChangeTodolistFilterActionType

export const todolistReducer = (state: TodoListsType[], action: ActionsTypes): TodoListsType[] => {
    switch (action.type){
        case 'REMOVE_TODOLIST':
            return state.filter(todo => todo.id !== action.payload.id)
        case 'ADD_TODOLIST':
            return [...state, {id: action.payload.id, title: action.payload.title, date: '', tasksFilter: 'all'}]
        case 'CHANGE_TODOLIST_TITLE':
            return state.map(todo => todo.id === action.payload.id ? {...todo, title: action.payload.title} : todo)
        case 'CHANGE_FILTER':
            return state.map(todo => todo.id === action.payload.id ? {...todo, tasksFilter: action.payload.filter} : todo)
        default:
            throw new Error('I don\'t understand this action type')
    }
}

export const RemoveTodolistAC = (todolistID: string): RemoveTodolistActionType => {
    return {
        type: 'REMOVE_TODOLIST',
        payload: {
            id: todolistID,
        }
    }
}

export const AddTodolistAC = (todolistID: string, titleTodolist: string): AddTodolistActionType => {
    return {
        type: 'ADD_TODOLIST',
        payload: {
            id: todolistID,
            title: titleTodolist,
        }
    }
}

export const ChangeTodolistTitleAC = (todolistID: string, todoTitle: string): ChangeTodolistTitleActionType => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        payload: {
            id: todolistID,
            title: todoTitle
        }
    }
}

export const ChangeTodolistFilterAC = (todolistID: string, filter:string): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE_FILTER',
        payload: {
            id: todolistID,
            filter: filter,
        },
    }
}