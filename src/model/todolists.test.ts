import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistReducer
} from "./todolist-reducer";
import {TodoListsType} from "../App";
import {todoDataLists} from "../redux/data"

let startState: TodoListsType[]
let testTitle: string
let filter: string

beforeEach(() => {
    startState = todoDataLists
    testTitle = 'Test Title'
})

test('correct todolist should be remove', () => {

    const endState = todolistReducer(startState, RemoveTodolistAC(startState[1].id))

    expect(endState.length).toBe(2)
    expect(endState[0].id).toBe(startState[0].id)
})

test('correct todolist should be add', () => {

    const endState = todolistReducer(startState, AddTodolistAC(startState[0].id))

    expect(endState.length).toBe(4)
    expect(endState[3].title).toBe(testTitle)
})

test('correct todolist should change its name', () => {

    const endState = todolistReducer(startState, ChangeTodolistTitleAC(startState[1].id, testTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(testTitle)
})

test('correct filter of todolist should be changed', () => {

    const endState = todolistReducer(startState, ChangeTodolistFilterAC(startState[0].id, filter))

    expect(endState[0].tasksFilter).toBe(filter)
    expect(endState[1].tasksFilter).toBe('all')
})
