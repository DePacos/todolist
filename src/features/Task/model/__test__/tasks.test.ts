import {
  TasksState,
  taskSlice,
  updateTask,
  removeTask,
  addTask,
  fetchTasks,
} from "features/Task/model/taskSlice"
import {
  todolistActions,
  TodoLists,
} from "features/Todolists/model/todolistSlice"

let startState: TasksState
let todoLists: TodoLists[]
let testTitle: string
let todoId1: string
let todoId2: string

beforeEach(() => {
  startState = {
    "111": [
      {
        id: "taskId111",
        title: "new task title",
        description: null,
        todoListId: "111",
        order: -3,
        status: 0,
        priority: 1,
        startDate: null,
        deadline: null,
        addedDate: "2024-06-22T19:33:25.243",
      },
    ],
    "222": [
      {
        id: "taskId222",
        title: "new task title",
        description: null,
        todoListId: "222",
        order: -2,
        status: 0,
        priority: 1,
        startDate: null,
        deadline: null,
        addedDate: "2024-06-22T19:31:08.8",
      },
    ],
  }
  todoLists = [
    {
      id: "111",
      title: "API",
      addedDate: "2024-06-22T18:14:51.42",
      order: -5,
    },
    {
      id: "222",
      title: "newTodolist456",
      addedDate: "2024-06-20T15:04:06.167",
      order: -4,
    },
  ]
  testTitle = "Test Title"
  todoId1 = "111"
  todoId2 = "222"
})

test("correct task should be deleted from correct array", () => {
  type ActionTypeForTest<T extends (...args: any) => any> = Omit<
    ReturnType<T>,
    "meta"
  >

  const action: ActionTypeForTest<typeof removeTask.fulfilled> = {
    type: removeTask.fulfilled.type,
    payload: { todoId: todoId1, taskId: "taskId111" },
  }

  const endState = taskSlice(startState, action)

  expect(endState[todoId1].length).toBe(0)
})

test("correct task should be added to correct array", () => {
  const task = {
    id: "taskId333",
    title: testTitle,
    description: null,
    todoListId: "222",
    order: -3,
    status: 1,
    priority: 1,
    startDate: null,
    deadline: null,
    addedDate: "2024-06-22T19:33:25.243",
  }

  type ActionTypeForTest<T extends (...args: any) => any> = Omit<
    ReturnType<T>,
    "meta"
  >

  const action: ActionTypeForTest<typeof addTask.fulfilled> = {
    type: addTask.fulfilled.type,
    payload: { task },
  }

  const endState = taskSlice(startState, action)

  expect(endState[todoId2].length).toBe(2)
  expect(endState[todoId2][0].id).toBe("taskId333")
  expect(endState[todoId2][0].title).toBe(testTitle)
  expect(endState[todoId2][0].status).toBe(1)
})

test("status of specified task should be changed", () => {
  type ActionTypeForTest<T extends (...args: any) => any> = Omit<
    ReturnType<T>,
    "meta"
  >

  const action: ActionTypeForTest<typeof updateTask.fulfilled> = {
    type: updateTask.fulfilled.type,
    payload: {
      todoId: todoId1,
      taskId: "taskId111",
      domainModel: { status: 444 },
    },
  }

  const endState = taskSlice(startState, action)

  expect(endState[todoId1][0].status).toBe(444)
  expect(endState[todoId2][0].status).toBe(0)
})
test("correct change task title", () => {
  type ActionTypeForTest<T extends (...args: any) => any> = Omit<
    ReturnType<T>,
    "meta"
  >

  const action: ActionTypeForTest<typeof updateTask.fulfilled> = {
    type: updateTask.fulfilled.type,
    payload: {
      todoId: todoId1,
      taskId: "taskId111",
      domainModel: { title: testTitle },
    },
  }

  const endState = taskSlice(startState, action)

  expect(endState[todoId1][0].title).toBe(testTitle)
  expect(endState[todoId2][0].title).toBe("new task title")
})

test("new array should be added when new todolist is added", () => {
  const todolist = {
    id: "333",
    title: "new456",
    addedDate: "2024-06-20T15:04:06.167",
    order: -1,
  }

  const endState = taskSlice(
    startState,
    todolistActions.createTodolist.fulfilled({ todolist }, "", testTitle),
  )

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k != todoId1 && k != todoId2)
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test("if todolist is deleted are deleted and the tasks", () => {
  const endState = taskSlice(
    startState,
    todolistActions.removeTodolist.fulfilled({ todoId: todoId1 }, "", ""),
  )

  expect(endState[todoId1]).toBe(undefined)
})

test("tasks should be added for todolist", () => {
  // type FetchTasks = {
  //   type: string
  //   payload: { tasks: TasksType[]; todoId: string }
  // }

  // type FetchTasks = Omit<ReturnType<typeof tasksThunks.getTask.fulfilled>, "meta">
  //
  // const action: FetchTasks = {
  //   type: tasksThunks.getTask.fulfilled.type,
  //   payload: { todoId: "111", tasks: startState["111"] },
  // }

  type ActionTypeForTest<T extends (...args: any) => any> = Omit<
    ReturnType<T>,
    "meta"
  >

  const action: ActionTypeForTest<typeof fetchTasks.fulfilled> = {
    type: fetchTasks.fulfilled.type,
    payload: { todoId: todoId1, tasks: startState[todoId1] },
  }

  const endState = taskSlice(
    {
      [todoId1]: [],
      [todoId2]: [],
    },
    action,
  )

  expect(endState[todoId1].length).toBe(1)
  expect(endState[todoId2].length).toBe(0)
})
