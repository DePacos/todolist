import { taskSlice } from "features/Task/model/taskSlice"
import { todolistActions, todolistSlice, TodoListsDomain, } from "features/Todolists/model/todolistSlice"
import { TasksState } from "features/Task/model/taskSlice"

let testTitle: string
let todolist: TodoListsDomain

beforeEach(() => {
  testTitle = "Test Title"
  todolist = {
    id: "333",
    title: testTitle,
    addedDate: "2024-06-20T15:04:06.167",
    order: -4,
    tasksFilter: "all",
    entityStatus: "idle",
  }
})

test("ids should be equals", () => {
  const startTasksState: TasksState = {}
  const startTodolistState: TodoListsDomain[] = []

  const endTasksState = taskSlice(startTasksState,
    todolistActions.createTodolist.fulfilled({ todolist }, '', testTitle))

  const endTodolistState = todolistSlice(startTodolistState,
    todolistActions.createTodolist.fulfilled({ todolist }, '', testTitle),
  )

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolist = endTodolistState[0].id

  expect(idFromTasks).toBe(todolist.id)
  expect(idFromTodolist).toBe(todolist.id)
})
