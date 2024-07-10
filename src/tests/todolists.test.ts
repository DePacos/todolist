import {
    createTodolistAC,
    changeTodolistFilterAC,
    updateTodolistTitleAC,
    removeTodolistAC, setTodolistAC,
    todolistReducer, TodoListsDomainType, Filter, changeTodolistStatusAC
} from "../store/reducers/todolist-reducer";
import {RequestStatusType} from "../store/reducers/app-reducers";



let startState: TodoListsDomainType[]
let testTitle: string
let filter: 'all' | 'active' | 'complete'
let status: RequestStatusType
let todolist: TodoListsDomainType

beforeEach(() => {
    startState = [
        {
            "id": "111",
            "title": "API",
            "addedDate": "2024-06-22T18:14:51.42",
            "order": -5,
            "tasksFilter": "all",
            'entityStatus': "idle"
        },
        {
            "id": "222",
            "title": "newTodolist456",
            "addedDate": "2024-06-20T15:04:06.167",
            "order": -4,
            "tasksFilter": "all",
            'entityStatus': "idle"
        },
    ]
    testTitle = 'Test Title'
    filter = 'complete'
    status = 'succeeded'
    todolist =   {
        "id": "333",
        "title": testTitle,
        "addedDate": "2024-06-20T15:04:06.167",
        "order": -4,
        "tasksFilter": "all",
        'entityStatus': "idle"
    }
})

test('correct todolist should be remove', () => {

    const endState = todolistReducer(startState, removeTodolistAC(startState[0].id))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(startState[1].id)
})

test('correct todolist should be add', () => {

    const endState = todolistReducer(startState, createTodolistAC(todolist))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(testTitle)
})

test('correct todolist should change its name', () => {

    const endState = todolistReducer(startState, updateTodolistTitleAC(startState[1].id, testTitle))

    expect(endState[0].title).toBe('API')
    expect(endState[1].title).toBe(testTitle)
})

test('correct filter of todolist should be changed', () => {

    const endState = todolistReducer(startState, changeTodolistFilterAC(startState[0].id, filter as Filter))

    expect(endState[0].tasksFilter).toBe(filter)
    expect(endState[0].tasksFilter).toBe('all')
})

test('correct entity status of todolist should be changed', () => {

    const endState = todolistReducer(startState, changeTodolistStatusAC(startState[0].id, status))

    expect(startState[0].entityStatus).toBe('idle')
    expect(endState[0].entityStatus).toBe(status)
})

test('todoLists should be set to the state', () => {

    const endState = todolistReducer([], setTodolistAC(startState,'completed'))

    expect(endState.length).toBe(2)
    expect(endState[1].tasksFilter).toBe('completed')
})
