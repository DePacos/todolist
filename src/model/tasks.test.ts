import {TasksStateType, TodoListsType} from "../App";
import {tasksDataLists, todoDataLists} from "../redux/data";
import {
    AddEmptyTaskAC,
    AddTaskAC,
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    RemoveTaskAC,
    taskReducer
} from "./task-reducer";

test('correct task should be remove', () => {

    const startState: TasksStateType = tasksDataLists
    const todoID = todoDataLists[0].id
    const taskID = startState[todoID][0].id
    const endState = taskReducer(startState, RemoveTaskAC(todoID, taskID))

    expect(endState[todoID].length).toBe(3)
})

test('correct task empty should be add', () => {

    const startState: TasksStateType = tasksDataLists
    const endState = taskReducer(startState, AddEmptyTaskAC('empty task'))

    expect(endState['empty task'].length).toBe(0)
})

test('correct task should be add', () => {

    const startState: TasksStateType = tasksDataLists
    const todoID = todoDataLists[0].id
    const newTaskTitle = 'newTaskTitle'
    const endState = taskReducer(startState, AddTaskAC(todoID, newTaskTitle))

    expect(endState[todoID].length).toBe(5)
    expect(endState[todoID][4].title).toBe(newTaskTitle)
})

test('correct change isDone', () => {

    const startState: TasksStateType = tasksDataLists
    const todoID = todoDataLists[0].id
    const taskID = tasksDataLists[todoID][0].id
    const endState = taskReducer(startState, ChangeTaskStatusAC(todoID, taskID))

    expect(endState[todoID][0].isDone).toBe(false)
})

test('correct change task title', () => {

    const startState: TasksStateType = tasksDataLists
    const todoID = todoDataLists[0].id
    const taskID = tasksDataLists[todoID][0].id
    const newTaskTitle = 'newTaskTitle'
    const endState = taskReducer(startState, ChangeTaskTitleAC(todoID, taskID, newTaskTitle))

    expect(endState[todoID][0].title).toBe(newTaskTitle)
})