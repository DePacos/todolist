import {TasksStateType} from "../App";
import {idTasks1, idTasks2, tasksDataLists, todoDataLists} from "../redux/data";
import {
    AddTaskAC,
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    RemoveTaskAC,
    taskReducer
} from "./task-reducer";
import {AddTodolistAC, RemoveTodolistAC} from "./todolist-reducer";
import {v1} from "uuid";

test('correct task should be deleted from correct array', () => {

    const startState: TasksStateType = tasksDataLists
    const todoID = todoDataLists[1].id
    const taskID = startState[todoID][1].id
    const endState = taskReducer(startState, RemoveTaskAC(todoID, taskID))

    expect(endState[todoID].length).toBe(2)
    expect(endState[todoID][1].id).toBe(tasksDataLists[todoID][2].id)
    expect(endState).toEqual(
        {
            [todoDataLists[0].id]:[
                {id: idTasks1.id1, title: 'HTML&CSS', isDone: true},
                {id: idTasks1.id2, title: 'JS', isDone: true},
                {id: idTasks1.id3, title: 'React', isDone: false},
                {id: idTasks1.id4, title: 'Redux', isDone: false},
            ],
            [todoDataLists[1].id]:[
                {id: idTasks2.id1, title: 'Hello world', isDone: true},
                {id: idTasks2.id3, title: 'Yo', isDone: false},
            ],
            [todoDataLists[2].id]:[]
        }
    )
})

test('correct task should be added to correct array', () => {

    const startState: TasksStateType = tasksDataLists
    const todoID = todoDataLists[0].id
    const todoID2 = todoDataLists[1].id
    const newTaskTitle = 'juce'
    const endState = taskReducer(startState, AddTaskAC(todoID2, newTaskTitle))

    expect(endState[todoID].length).toBe(4)
    expect(endState[todoID2].length).toBe(4)
    expect(endState[todoID2][0].id).toBeDefined()
    expect(endState[todoID2][0].title).toBe(newTaskTitle)
    expect(endState[todoID2][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {

    const startState: TasksStateType = tasksDataLists
    const todoID = todoDataLists[0].id
    const todoID2 = todoDataLists[1].id
    const taskID = tasksDataLists[todoID][0].id
    const isDone = tasksDataLists[todoID][0].isDone
    const endState = taskReducer(startState, ChangeTaskStatusAC(todoID, taskID, isDone))

    expect(endState[todoID][0].isDone).toBeFalsy()
    expect(endState[todoID2][0].isDone).toBeTruthy()
})

test('correct change task title', () => {

    const startState: TasksStateType = tasksDataLists
    const todoID = todoDataLists[0].id
    const todoID2 = todoDataLists[1].id
    const taskID = tasksDataLists[todoID][0].id
    const newTaskTitle = 'newTaskTitle'
    const endState = taskReducer(startState, ChangeTaskTitleAC(todoID, taskID, newTaskTitle))

    expect(endState[todoID][0].title).toBe(newTaskTitle)
    expect(endState[todoID2][0].title).toBe('Hello world')
})

test('new array should be added when new todolist is added', () => {

    const id = v1()
    const startState: TasksStateType = tasksDataLists
    const todoId = todoDataLists[0].id
    const todoId2 = todoDataLists[1].id
    const todoId3 = todoDataLists[2].id
    const endState = taskReducer(startState, AddTodolistAC(id))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != todoId && k != todoId2 && k != todoId3)
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(4)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = tasksDataLists
    const todoId2 = todoDataLists[1].id
    const action = RemoveTodolistAC(todoId2)
    const endState = taskReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState[todoId2]).not.toBeDefined()
})
