import {
    AddTodolistAC, ChangeTodolistFilterAC,
    ChangeTodolistFilterActionType, ChangeTodolistTitleAC, ChangeTodolistTitleActionType, RemoveTodolistAC,
    RemoveTodolistActionType,
    todolistReducer
} from "./todolist-reducer";
import {TodoListsType} from "../App";
import {todoDataLists} from "../redux/data"

test('correct todolist should be remove', () => {

    const startState: TodoListsType[] = todoDataLists
    const endState = todolistReducer(startState, RemoveTodolistAC(startState[1].id))

    expect(endState.length).toBe(2)
    expect(endState[0].id).toBe(startState[0].id)
})

test('correct todolist should be add', () => {

    const startState: TodoListsType[] = todoDataLists
    const newTodolistTitle = 'NewTodoList'
    const endState = todolistReducer(startState, AddTodolistAC(todoDataLists[0].id, newTodolistTitle))

    expect(endState.length).toBe(4)
    expect(endState[3].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name', () => {

    const startState: TodoListsType[] = todoDataLists
    const changeTodolistTitle = 'ChangeTodoListTitle'
    const endState = todolistReducer(startState, ChangeTodolistTitleAC(todoDataLists[1].id, changeTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(changeTodolistTitle)
})

test('correct filter of todolist should be changed', () => {

    const startState: TodoListsType[] = todoDataLists
    const newFilter = 'completed'
    const endState = todolistReducer(startState, ChangeTodolistFilterAC(todoDataLists[0].id, newFilter))

    expect(endState[0].tasksFilter).toBe(newFilter)
    expect(endState[1].tasksFilter).toBe('all')
})
