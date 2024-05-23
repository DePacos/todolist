import {TasksStateType} from "../App";
import {AddTodolistActionType, RemoveTodolistActionType,} from "./todolist-reducer";



export type AddTaskActionType = {
    type: 'ADD_TASK'
    payload: {
        todoID: string
        title: string
    }
}

export type RemoveTaskActionType = {
    type: 'REMOVE_TASK'
    payload: {
        todoID: string
        taskID: string,
    }
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE_TASK_STATUS'
    payload: {
        todoID: string
        taskID: string
        isDone: boolean
    }
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE_TASK_TITLE'
    payload: {
        todoID: string
        taskID: string
        title: string
    }
}

export type ActionsTypes =
    AddTodolistActionType |
    AddTaskActionType |
    RemoveTodolistActionType|
    RemoveTaskActionType |
    ChangeTaskStatusActionType |
    ChangeTaskTitleActionType

export const taskReducer = (state: TasksStateType, action: ActionsTypes): TasksStateType => {
    switch (action.type){
        case 'ADD_TODOLIST':
            return {...state, [action.payload.id]: []}
        case 'ADD_TASK':
            return {...state, [action.payload.todoID]: [{id: '', title: action.payload.title, isDone: false}, ...state[action.payload.todoID]]}
        case 'REMOVE_TODOLIST':
            return (({[action.payload.todoID]: _, ...rest}) => rest)(state)
        case 'REMOVE_TASK':
            return {...state, [action.payload.todoID]: state[action.payload.todoID].filter(el => el.id !== action.payload.taskID)}
        case 'CHANGE_TASK_STATUS':
            return {...state, [action.payload.todoID]: state[action.payload.todoID].map(el => el.id === action.payload.taskID ? {...el, isDone: !action.payload.isDone}: el)}
        case 'CHANGE_TASK_TITLE':
            return {...state, [action.payload.todoID]: state[action.payload.todoID].map(el => el.id === action.payload.taskID ? {...el, title: action.payload.title}: el)}
        default:
            throw new Error('I don\'t understand this action type')
    }
}

export const AddTaskAC = (todoID: string, title: string): AddTaskActionType => {
    return {
        type: 'ADD_TASK',
        payload: {
            todoID,
            title,
        }
    }
}

export const RemoveTaskAC = (todoID: string, taskID: string): RemoveTaskActionType =>{
    return {
        type: 'REMOVE_TASK',
        payload: {
            todoID,
            taskID,
        }
    }
}

export const ChangeTaskStatusAC = (todoID: string, taskID: string, isDone: boolean): ChangeTaskStatusActionType => {
    return {
        type: 'CHANGE_TASK_STATUS',
        payload: {
            todoID,
            taskID,
            isDone,
        }
    }
}

export const ChangeTaskTitleAC = (todoID: string, taskID: string, title: string): ChangeTaskTitleActionType => {
    return {
        type: 'CHANGE_TASK_TITLE',
        payload: {
            todoID,
            taskID,
            title,
        }
    }
}

