import {taskReducer} from "./task-reducer";
import {AddTodolistAC, todolistReducer} from "./todolist-reducer";
import {TasksStateType, TodoListsType} from "../App";
import {v1} from "uuid";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodoListsType> = []

    const id = v1()
    const endTasksState = taskReducer(startTasksState, AddTodolistAC(id))
    const endTodolistsState = todolistReducer(startTodolistsState, AddTodolistAC(id))

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(AddTodolistAC(id).payload.id)
    expect(idFromTodolists).toBe(AddTodolistAC(id).payload.id)
})