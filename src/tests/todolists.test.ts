import {
    createTodolistAC,
    changeTodolistFilterAC,
    updateTodolistTitleAC,
    removeTodolistAC, setTodolistAC,
    todolistReducer, TodoListsDomainType
} from "../store/reducers/todolist-reducer";



let startState: TodoListsDomainType[]
let testTitle: string
let filter: 'all' | 'active' | 'complete'
let todolist: TodoListsDomainType

beforeEach(() => {
    startState = [
        {
            "id": "111",
            "title": "API",
            "addedDate": "2024-06-22T18:14:51.42",
            "order": -5,
            "tasksFilter": "all"
        },
        {
            "id": "222",
            "title": "newTodolist456",
            "addedDate": "2024-06-20T15:04:06.167",
            "order": -4,
            "tasksFilter": "all",
        },
    ]
    testTitle = 'Test Title'
    filter = 'complete'
    todolist =   {
        "id": "333",
        "title": testTitle,
        "addedDate": "2024-06-20T15:04:06.167",
        "order": -4,
        "tasksFilter": "all",
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

    const endState = todolistReducer(startState, changeTodolistFilterAC(startState[0].id, filter))

    expect(endState[0].tasksFilter).toBe(filter)
    expect(endState[1].tasksFilter).toBe('all')
})

test('todoLists should be set to the state', () => {

    const endState = todolistReducer([], setTodolistAC(startState,'test'))

    expect(endState.length).toBe(2)
    expect(endState[1].tasksFilter).toBe('test')
})
