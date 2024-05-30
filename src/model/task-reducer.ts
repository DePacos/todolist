import {TasksStateType} from "../App";
import {AddTodolistActionType, RemoveTodolistActionType,} from "./todolist-reducer";
import {tasksDataLists, todoDataLists} from "../redux/data";



export type AddTaskActionType = ReturnType<typeof AddTaskAC>

export type RemoveTaskActionType = ReturnType<typeof RemoveTaskAC>

export type ChangeTaskStatusActionType = ReturnType<typeof ChangeTaskStatusAC>

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


const initialState = tasksDataLists

export const taskReducer = (state: TasksStateType = initialState, action: ActionsTypes): TasksStateType => {
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
            return state
    }
}

export const AddTaskAC = (todoID: string, title: string) => {
    return {
        type: 'ADD_TASK',
        payload: {
            todoID,
            title,
        }
    } as const
}

export const RemoveTaskAC = (todoID: string, taskID: string) =>{
    return {
        type: 'REMOVE_TASK',
        payload: {
            todoID,
            taskID,
        }
    } as const
}

export const ChangeTaskStatusAC = (todoID: string, taskID: string, isDone: boolean) => {
    return {
        type: 'CHANGE_TASK_STATUS',
        payload: {
            todoID,
            taskID,
            isDone,
        }
    } as const
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

