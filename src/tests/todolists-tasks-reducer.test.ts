import {taskReducer} from "../store/reducers/task-reducer";
import {createTodolistAC, todolistReducer, TodoListsDomainType} from "../store/reducers/todolist-reducer";
import {TasksStateType} from "../store/reducers/task-reducer";


let testTitle: string
let filter: 'all' | 'active' | 'complete'
let todolist: TodoListsDomainType

beforeEach(() => {
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


test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistState: TodoListsDomainType[] = []

    const endTasksState = taskReducer(startTasksState, createTodolistAC(todolist))
    const endTodolistState = todolistReducer(startTodolistState, createTodolistAC(todolist))

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolist = endTodolistState[0].id

    expect(idFromTasks).toBe(createTodolistAC(todolist).payload.todolist.id)
    expect(idFromTodolist).toBe(createTodolistAC(todolist).payload.todolist.id)
})