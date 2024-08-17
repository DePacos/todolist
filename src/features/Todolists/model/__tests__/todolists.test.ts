import { todolistSlice, todolistActions, TodoListsDomain, Filter, } from "features/Todolists/model/todolistSlice"
import { RequestStatusType } from "app/appSlice"

let startState: TodoListsDomain[]
let testTitle: string
let filter: "all" | "active" | "completed" | "test"
let status: RequestStatusType
let todolist: TodoListsDomain

beforeEach(() => {
  startState = [
    {
      id: "111",
      title: "API",
      addedDate: "2024-06-22T18:14:51.42",
      order: -5,
      tasksFilter: "all",
      entityStatus: "idle",
    },
    {
      id: "222",
      title: "newTodolist456",
      addedDate: "2024-06-20T15:04:06.167",
      order: -4,
      tasksFilter: "all",
      entityStatus: "idle",
    },
  ]
  testTitle = "Test Title"
  filter = "completed"
  status = "succeeded"
  todolist = {
    id: "333",
    title: testTitle,
    addedDate: "2024-06-20T15:04:06.167",
    order: -4,
    tasksFilter: "all",
    entityStatus: "idle",
  }
})

test("correct todolist should be remove", () => {
  const endState = todolistSlice(startState,
    todolistActions.removeTodolist.fulfilled({todoId: startState[0].id}, '', ''),
  )

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(startState[1].id)
})

test("correct todolist should be add", () => {
  const endState = todolistSlice(
    startState,
    todolistActions.createTodolist.fulfilled({ todolist }, '', ''),
  )

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(testTitle)
})

test("correct todolist should change its name", () => {
  const endState = todolistSlice(
    startState,
    todolistActions.updateTodolistTitle
      .fulfilled({ todoId: startState[1].id, title: testTitle }, '', {todoId: '', title: ''}),
  )

  expect(endState[0].title).toBe("API")
  expect(endState[1].title).toBe(testTitle)
})

test("correct filter of todolist should be changed", () => {
  const endState = todolistSlice(
    startState,
    todolistActions.changeTodolistFilter({
      todoId: startState[0].id,
      filter: filter as Filter,
    }),
  )

  expect(endState[0].tasksFilter).toBe(filter)
  expect(endState[1].tasksFilter).toBe("all")
})

test("correct entity status of todolist should be changed", () => {
  const endState = todolistSlice(
    startState,
    todolistActions.changeTodolistStatus({
      todoId: startState[0].id,
      entityStatus: status,
    }),
  )

  expect(startState[0].entityStatus).toBe("idle")
  expect(endState[0].entityStatus).toBe(status)
})

test("todoLists should be set to the state", () => {
  const endState = todolistSlice(
    [],
    todolistActions.fetchTodolist.fulfilled({ todolist: startState, filter}, '', undefined)
  )

  expect(endState.length).toBe(2)
  expect(endState[1].tasksFilter).toBe("completed")
})
