import {
    addTaskAC,
    updateTaskAC,
    removeTaskAC, setTasksAC,
    taskReducer
} from "../store/reducers/task-reducer";
import {createTodolistAC, removeTodolistAC, setTodolistAC} from "../store/reducers/todolist-reducer";
import {TodoListsType} from "../store/reducers/todolist-reducer";
import {TasksStateType} from "../store/reducers/task-reducer";



let startState: TasksStateType
let todoLists: TodoListsType[]
let testTitle: string

beforeEach( () => {
    startState = {
        '111': [
            {
            "id": "taskId111",
            "title": "new task title",
            "description": null,
            "todoListId": "111",
            "order": -3,
            "status": 0,
            "priority": 1,
            "startDate": null,
            "deadline": null,
            "addedDate": "2024-06-22T19:33:25.243"
        }
        ],
        '222': [
            {
            "id": "taskId222",
            "title": "new task title",
            "description": null,
            "todoListId": "222",
            "order": -2,
            "status": 0,
            "priority": 1,
            "startDate": null,
            "deadline": null,
            "addedDate": "2024-06-22T19:31:08.8"
        },
    ]
    }
    todoLists = [
        {
            "id": "111",
            "title": "API",
            "addedDate": "2024-06-22T18:14:51.42",
            "order": -5
        },
        {
            "id": "222",
            "title": "newTodolist456",
            "addedDate": "2024-06-20T15:04:06.167",
            "order": -4
        },
    ]
    testTitle = 'Test Title'
})

test('correct task should be deleted from correct array', () => {

    const todoId = todoLists[0].id
    const taskId = startState[todoId][0].id
    const endState = taskReducer(startState, removeTaskAC(todoId, taskId))

    expect(endState[todoId].length).toBe(0)
})

test('correct task should be added to correct array', () => {
    const task = {
        "id": "taskId333",
        "title": testTitle,
        "description": null,
        "todoListId": "222",
        "order": -3,
        "status": 1,
        "priority": 1,
        "startDate": null,
        "deadline": null,
        "addedDate": "2024-06-22T19:33:25.243"
    }

    const endState = taskReducer(startState, addTaskAC(task))

    expect(endState['222'].length).toBe(2)
    expect(endState['222'][0].id).toBe('taskId222')
    expect(endState['222'][1].title).toBe(testTitle)
    expect(endState['222'][1].status).toBe(1)
})

test('status of specified task should be changed', () => {

    const todoID = todoLists[0].id
    const todoID2 = todoLists[1].id
    const taskID = startState[todoID][0].id
    const endState = taskReducer(startState, updateTaskAC(todoID, taskID, {status:444}))

    expect(endState[todoID][0].status).toBe(444)
    expect(endState[todoID2][0].status).toBe(0)

})
test('correct change task title', () => {

    const todoID = todoLists[0].id
    const todoID2 = todoLists[1].id
    const taskID = startState[todoID][0].id
    const endState = taskReducer(startState, updateTaskAC(todoID, taskID, {title:testTitle}))

    expect(endState[todoID][0].title).toBe(testTitle)
    expect(endState[todoID2][0].title).toBe("new task title")
})

test('new array should be added when new todolist is added', () => {

    const todoList =  {
            "id": "333",
            "title": "new456",
            "addedDate": "2024-06-20T15:04:06.167",
            "order": -1
        }

    const todoId1 = todoLists[0].id
    const todoId2 = todoLists[1].id

    const endState = taskReducer(startState, createTodolistAC(todoList))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != todoId1 && k != todoId2)
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {

    const todoId2 = todoLists[1].id
    const endState = taskReducer(startState, removeTodolistAC(todoId2))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState[todoId2]).not.toBeDefined()
})

test('empty arrays should be added when we set todolist', () => {

    const todoID1 = todoLists[0].id
    const todoID2 = todoLists[1].id
    const endState = taskReducer(startState, setTodolistAC(todoLists))

    expect(endState[todoID1]).toStrictEqual([])
    expect(endState[todoID2]).toStrictEqual([])
})

test('tasks should be added for todolist', () => {

    const todoID1 = todoLists[0].id
    const todoID2 = todoLists[1].id
    const endState = taskReducer({
        [todoID1]: [],
        [todoID2]: [],
    }, setTasksAC(todoID1, startState[todoID2]))

    expect(endState[todoID1].length).toBe(1)
    expect(endState[todoID2].length).toBe(0)
})
