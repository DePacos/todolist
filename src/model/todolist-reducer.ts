import {TodoListsType} from "../App";
import {todoDataLists} from "../redux/data";

export type AddTodolistActionType = ReturnType<typeof AddTodolistAC>

export type RemoveTodolistActionType = ReturnType<typeof RemoveTodolistAC>

export type ChangeTodolistTitleActionType = ReturnType<typeof ChangeTodolistTitleAC>

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE_FILTER'
    payload: {
        todoID: string
        filter: string,
    },
}

export type ActionsTypes =
    AddTodolistActionType |
    RemoveTodolistActionType |
    ChangeTodolistTitleActionType |
    ChangeTodolistFilterActionType

const initialState = todoDataLists

export const todolistReducer = (state: TodoListsType[] = initialState, action: ActionsTypes): TodoListsType[] => {
    switch (action.type){
        case 'ADD_TODOLIST':
            return [...state, {id: action.payload.id, title: action.payload.todoTitle, date: '', tasksFilter: 'all'}]
        case 'REMOVE_TODOLIST':
            return state.filter(todo => todo.id !== action.payload.todoID)
        case 'CHANGE_TODOLIST_TITLE':
            return state.map(todo => todo.id === action.payload.todoID ? {...todo, title: action.payload.todoTitle} : todo)
        case 'CHANGE_FILTER':
            return state.map(todo => todo.id === action.payload.todoID ? {...todo, tasksFilter: action.payload.filter} : todo)
        default:
            return state
    }
}

export const AddTodolistAC = (todoOrTaskID: string, todoTitle = 'Test Title' ) => {
    return {
        type: 'ADD_TODOLIST',
        payload: {
            id: todoOrTaskID,
            todoTitle,
        }
    } as const
}

export const RemoveTodolistAC = (todoID: string) => {
    return {
        type: 'REMOVE_TODOLIST',
        payload: {
            todoID,
        }
    } as const
}

export const ChangeTodolistTitleAC = (todoID: string, todoTitle: string) => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        payload: {
            todoID,
            todoTitle
        }
    }  as const
}

export const ChangeTodolistFilterAC = (todoID: string, filter:string): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE_FILTER',
        payload: {
            todoID,
            filter,
        },
    }
}