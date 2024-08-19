import { todolistActions } from "features/Todolists/model/todolistSlice"
import { AppRootState } from "app/store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk"
import {
  ResultCode,
  TaskPriorities,
  TaskStatuses,
} from "common/enums/commonEnums"
import { tasksAPI } from "features/Task/api/tasksAPI"
import { RejectAppError, RejectCatchError } from "common/types"

export const sliceTasks = createSlice({
  name: "todolist",
  initialState: {} as TasksState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(todolistActions.createTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })

      .addCase(todolistActions.removeTodolist.fulfilled, (state, action) => {
        delete state[action.payload.todoId]
      })

      .addCase(todolistActions.fetchTodolist.fulfilled, (state, action) => {
        action.payload.todolist.forEach((todo) => {
          state[todo.id] = []
        })
      })

      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todoId] = action.payload.tasks
      })

      .addCase(
        addTask.fulfilled,
        (state, action: PayloadAction<{ task: Tasks }>) => {
          state[action.payload.task.todoListId].unshift(action.payload.task)
        },
      )

      .addCase(removeTask.fulfilled, (state, action) => {
        const index = state[action.payload.todoId].findIndex(
          (task) => task.id === action.payload.taskId,
        )
        if (index !== -1) state[action.payload.todoId].splice(index, 1)
      })

      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state[action.payload.todoId].findIndex(
          (task) => task.id === action.payload.taskId,
        )
        if (index !== -1)
          state[action.payload.todoId][index] = {
            ...state[action.payload.todoId][index],
            ...action.payload.domainModel,
          }
      })

      .addCase(todolistActions.clearingTodolistWhenLogout, (state, action) => {
        return {}
      })
  },
})

export const fetchTasks = createAppAsyncThunk<
  { todoId: string; tasks: Tasks[] },
  string
>(
  `${sliceTasks.name}/fetchTasks`,
  async (todoId: string, { rejectWithValue }) => {
    try {
      const res = await tasksAPI.getTasks(todoId)
      return { todoId, tasks: res.data.items }
    } catch (error) {
      return rejectWithValue({
        error,
        type: "catchError",
      } satisfies RejectCatchError)
    }
  },
)

export const addTask = createAppAsyncThunk<
  { task: Tasks },
  { todoId: string; taskTitle: string }
>(`${sliceTasks.name}/createTask`, async (arg, { rejectWithValue }) => {
  try {
    const res = await tasksAPI.createTask(arg.todoId, arg.taskTitle)
    if (res.data.resultCode === ResultCode.Success) {
      return { task: res.data.data.item }
    } else {
      return rejectWithValue({
        error: res.data,
        type: "appError",
      } satisfies RejectAppError)
    }
  } catch (error) {
    return rejectWithValue({
      error,
      type: "catchError",
    } satisfies RejectCatchError)
  }
})

export const updateTask = createAppAsyncThunk<UpdateTaskArgs, UpdateTaskArgs>(
  `${sliceTasks.name}/updateTask`,
  async (arg, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI
    const { tasks } = getState() as AppRootState
    try {
      const task = tasks[arg.todoId].find(
        (task: Tasks) => task.id === arg.taskId,
      )

      const apiModel = {
        title: task!.title,
        description: task!.description,
        status: task!.status,
        priority: task!.priority,
        startDate: task!.startDate,
        deadline: task!.deadline,
        ...arg.domainModel,
      }
      const res = await tasksAPI.updateTask(arg.todoId, arg.taskId, apiModel)
      if (res.data.resultCode === ResultCode.Success) {
        return arg
      } else {
        return rejectWithValue({
          error: res.data,
          type: "appError",
        } satisfies RejectAppError)
      }
    } catch (error) {
      return rejectWithValue({
        error,
        type: "catchError",
      } satisfies RejectCatchError)
    }
  },
)

export const removeTask = createAppAsyncThunk(
  `${sliceTasks.name}/removeTask`,
  async (arg: { todoId: string; taskId: string }, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      const res = await tasksAPI.removeTask(arg.todoId, arg.taskId)
      if (res.data.resultCode === ResultCode.Success) {
        return arg
      } else {
        return rejectWithValue({
          error: res.data,
          type: "appError",
        } satisfies RejectAppError)
      }
    } catch (error) {
      return rejectWithValue({
        error,
        type: "catchError",
      } satisfies RejectCatchError)
    }
  },
)

export const taskSlice = sliceTasks.reducer

export type TasksState = {
  [key: string]: Tasks[]
}

export type Tasks = {
  id: string
  title: string
  description: string | null
  todoListId: string
  order: number
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string | null
  deadline: string | null
  addedDate: string
}

export type UpdateDomainTask = {
  title?: string
  description?: string | null
  status?: number
  priority?: number
  startDate?: string | null
  deadline?: string | null
}

type UpdateTaskArgs = {
  todoId: string
  taskId: string
  domainModel: UpdateDomainTask
}
