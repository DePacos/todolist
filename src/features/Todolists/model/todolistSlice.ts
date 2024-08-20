import { RequestStatusType } from "app/appSlice"
import {
  asyncThunkCreator,
  buildCreateSlice,
  isRejected,
  PayloadAction,
} from "@reduxjs/toolkit"
import { tasksAPI } from "features/Todolists/api/todolistAPI"
import { ResultCode } from "common/enums"
import { RejectAppError, RejectCatchError } from "common/types"

const createTodolistSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

export const sliceTodolist = createTodolistSlice({
  name: "todolist",
  initialState: [] as TodoListsDomain[],
  reducers: (creators) => {
    return {
      createTodolist: creators.asyncThunk(
        async (title: string, { rejectWithValue }) => {
          try {
            const res = await tasksAPI.createTodolist(title)
            if (res.data.resultCode === ResultCode.Success) {
              return { todolist: res.data.data.item }
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
        {
          fulfilled: (state, action) => {
            state.unshift({
              ...action.payload.todolist,
              tasksFilter: "all",
              entityStatus: "idle",
            })
          },
        },
      ),

      removeTodolist: creators.asyncThunk(
        async (todoId: string, { rejectWithValue }) => {
          try {
            const res = await tasksAPI.removeTodolist(todoId)
            if (res.data.resultCode === ResultCode.Success) {
              return { todoId }
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
        {
          fulfilled: (state, action) => {
            const index = state.findIndex(
              (todo) => todo.id === action.payload.todoId,
            )
            if (index !== -1) state.splice(index, 1)
          },
        },
      ),

      updateTodolistTitle: creators.asyncThunk(
        async (arg: { todoId: string; title: string }, { rejectWithValue }) => {
          try {
            const res = await tasksAPI.updateTodolist(arg.todoId, arg.title)
            if (res.data.resultCode === ResultCode.Success) {
              return { todoId: arg.todoId, title: arg.title }
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
        {
          fulfilled: (state, action) => {
            const index = state.findIndex(
              (todo) => todo.id === action.payload.todoId,
            )
            if (index !== -1) state[index].title = action.payload.title
          },
        },
      ),

      fetchTodolist: creators.asyncThunk(
        async (undefined, { rejectWithValue }) => {
          try {
            const res = await tasksAPI.getTodolist()
            return { todolist: res.data, filter: "test" as Filter }
          } catch (error) {
            return rejectWithValue({
              error,
              type: "catchError",
            } satisfies RejectCatchError)
          }
        },
        {
          fulfilled: (state, action) => {
            return action.payload.todolist.map((todo) => ({
              ...todo,
              tasksFilter:
                action.payload.filter === "test"
                  ? "all"
                  : action.payload.filter,
              entityStatus: "idle",
            }))
          },
        },
      ),

      changeTodolistStatus: creators.reducer(
        (
          state,
          action: PayloadAction<{
            todoId: string
            entityStatus: RequestStatusType
          }>,
        ) => {
          const index = state.findIndex(
            (todo) => todo.id === action.payload.todoId,
          )
          if (index !== -1)
            state[index].entityStatus = action.payload.entityStatus
        },
      ),

      changeTodolistFilter: creators.reducer(
        (state, action: PayloadAction<{ todoId: string; filter: Filter }>) => {
          const index = state.findIndex(
            (todo) => todo.id === action.payload.todoId,
          )
          if (index !== -1) state[index].tasksFilter = action.payload.filter
        },
      ),

      clearingTodolistWhenLogout: creators.reducer(() => {
        return []
      }),
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isRejected(todolistActions.removeTodolist),
      (state, action) => {
        const todoList = state.find((todo) => todo.id === action.meta.arg)
        if (todoList) {
          todoList.entityStatus = "loading"
        }
      },
    )
  },
})

export const todolistSlice = sliceTodolist.reducer
export const todolistActions = sliceTodolist.actions

export type Filter = "all" | "active" | "completed" | "test"

export type TodoListsDomain = TodoLists & {
  tasksFilter: Filter
  entityStatus: RequestStatusType
}

export type TodoLists = {
  id: string
  addedDate: string
  title: string
  order: number
}
