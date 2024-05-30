import {TasksStateType, TodoListsType} from "../App";
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

let startState: TasksStateType
let todoList: TodoListsType[]
let testTitle: string


beforeEach( () => {
    startState = tasksDataLists
    todoList = todoDataLists
    testTitle = 'Test Title'
})

test('correct task should be deleted from correct array', () => {

    const todoID = todoList[1].id
    const taskID = startState[todoID][1].id
    const endState = taskReducer(startState, RemoveTaskAC(todoID, taskID))

    expect(endState[todoID].length).toBe(2)
    expect(endState[todoID][1].id).toBe(startState[todoID][2].id)
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

    const todoID = todoList[0].id
    const todoID2 = todoList[1].id
    const endState = taskReducer(startState, AddTaskAC(todoID2, testTitle))

    expect(endState[todoID].length).toBe(4)
    expect(endState[todoID2].length).toBe(4)
    expect(endState[todoID2][0].id).toBeDefined()
    expect(endState[todoID2][0].title).toBe(testTitle)
    expect(endState[todoID2][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {

    const todoID = todoList[0].id
    const todoID2 = todoList[1].id
    const taskID = startState[todoID][0].id
    const isDone = startState[todoID][0].isDone
    const endState = taskReducer(startState, ChangeTaskStatusAC(todoID, taskID, isDone))

    expect(endState[todoID][0].isDone).toBeFalsy()
    expect(endState[todoID2][0].isDone).toBeTruthy()
})

test('correct change task title', () => {

    const todoID = todoList[0].id
    const todoID2 = todoList[1].id
    const taskID = startState[todoID][0].id
    const endState = taskReducer(startState, ChangeTaskTitleAC(todoID, taskID, testTitle))

    expect(endState[todoID][0].title).toBe(testTitle)
    expect(endState[todoID2][0].title).toBe('Hello world')
})

test('new array should be added when new todolist is added', () => {

    const id = v1()
    const todoID = todoList[0].id
    const todoID2 = todoList[1].id
    const todoID3 = todoList[2].id
    const endState = taskReducer(startState, AddTodolistAC(id))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != todoID && k != todoID2 && k != todoID3)
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(4)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {

    const todoId2 = todoDataLists[1].id
    const endState = taskReducer(startState, RemoveTodolistAC(todoId2))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState[todoId2]).not.toBeDefined()
})
