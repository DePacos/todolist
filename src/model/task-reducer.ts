import {TasksStateType, TasksType, TodoListsType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType,} from "./todolist-reducer";
import {tasksDataLists} from "../redux/data";

export type UpdateTasksActionType = {
    type: 'UPDATE_TASKS'
}

export type RemoveTaskActionType = {
    type: 'REMOVE_TASK'
    payload: {
        todoID: string
        taskID: string,
    }
}

export type AddEmptyTaskActionType = {
    type: 'ADD_EMPTY_TASK'
    payload: {
        taskID: string
    }
}

export type AddTaskActionType = {
    type: 'ADD_TASK'
    payload: {
        todoID: string
        title: string
    }
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE_TASK_STATUS'
    payload: {
        todoID: string
        taskID: string
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
    AddTaskActionType |
    RemoveTaskActionType |
    AddEmptyTaskActionType |
    ChangeTaskStatusActionType |
    ChangeTaskTitleActionType |
    UpdateTasksActionType

export const taskReducer = (state: TasksStateType, action: ActionsTypes): TasksStateType => {
    switch (action.type){
        case 'UPDATE_TASKS':
            return {...state}
        case 'REMOVE_TASK':
            return {...state, [action.payload.todoID]: state[action.payload.todoID].filter(el => el.id !== action.payload.taskID)}
        case 'ADD_EMPTY_TASK':
            return {...state, [action.payload.taskID]: []}
        case 'ADD_TASK':
            return {...state, [action.payload.todoID]: [...state[action.payload.todoID], {id: '', title: action.payload.title, isDone: false}]}
        case 'CHANGE_TASK_STATUS':
            return {...state, [action.payload.todoID]: state[action.payload.todoID].map(el => el.id === action.payload.taskID ? {...el, isDone: !el.isDone}: el)}
        case 'CHANGE_TASK_TITLE':
            return {...state, [action.payload.todoID]: state[action.payload.todoID].map(el => el.id === action.payload.taskID ? {...el, title: action.payload.title}: el)}
        default:
            throw new Error('I don\'t understand this action type')
    }
}


export const UpdateTasksAC = (): UpdateTasksActionType => {
    return {
        type: 'UPDATE_TASKS',
    }
}

export const RemoveTaskAC = (todoID: string, taskID: string): RemoveTaskActionType =>{
    return {
        type: 'REMOVE_TASK',
        payload: {
            todoID: todoID,
            taskID: taskID,
        }
    }
}

export const AddEmptyTaskAC = (taskID: string): AddEmptyTaskActionType => {
    return {
        type: 'ADD_EMPTY_TASK',
        payload: {
            taskID: taskID
        }
    }
}

export const AddTaskAC = (todoID: string, title: string): AddTaskActionType => {
    return {
        type: 'ADD_TASK',
        payload: {
            todoID: todoID,
            title: title,
        }
    }
}

export const ChangeTaskStatusAC = (todoID: string, taskID: string): ChangeTaskStatusActionType => {
    return {
        type: 'CHANGE_TASK_STATUS',
        payload: {
            todoID: todoID,
            taskID: taskID,
        }
    }
}

export const ChangeTaskTitleAC = (todoID: string, taskID: string, title: string): ChangeTaskTitleActionType => {
    return {
        type: 'CHANGE_TASK_TITLE',
        payload: {
            todoID: todoID,
            taskID: taskID,
            title: title,
        }
    }
}