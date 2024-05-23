import {TodoListsType} from "../App";

export type AddTodolistActionType = {
    type: 'ADD_TODOLIST'
    payload: {
        id: string
        todoTitle: string
    }
}

export type RemoveTodolistActionType = {
    type: 'REMOVE_TODOLIST'
    payload: {
        todoID: string
    }
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE_TODOLIST_TITLE'
    payload: {
        todoID: string
        todoTitle: string
    }
}
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

export const todolistReducer = (state: TodoListsType[], action: ActionsTypes): TodoListsType[] => {
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
            throw new Error('I don\'t understand this action type')
    }
}

export const AddTodolistAC = (todoOrTaskID: string, todoTitle = 'new Todolist' ): AddTodolistActionType => {
    return {
        type: 'ADD_TODOLIST',
        payload: {
            id: todoOrTaskID,
            todoTitle,
        }
    }
}

export const RemoveTodolistAC = (todoID: string): RemoveTodolistActionType => {
    return {
        type: 'REMOVE_TODOLIST',
        payload: {
            todoID,
        }
    }
}

export const ChangeTodolistTitleAC = (todoID: string, todoTitle: string): ChangeTodolistTitleActionType => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        payload: {
            todoID,
            todoTitle
        }
    }
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