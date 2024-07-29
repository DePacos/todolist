import { combineReducers, UnknownAction } from "redux"
import { todolistReducer } from "./reducers/todolist-reducer"
import { taskReducer } from "./reducers/task-reducer"
import { thunk, ThunkAction, ThunkDispatch } from "redux-thunk"
import { useDispatch } from "react-redux"
import { appReducer } from "./reducers/app-reducers"
import { authReducer } from "./reducers/auth-reducer"
import { configureStore } from "@reduxjs/toolkit"

const rootReducer = combineReducers({
  todolists: todolistReducer,
  tasks: taskReducer,
  app: appReducer,
  auth: authReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
})

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()

// types
export type AppRootState = ReturnType<typeof rootReducer>
export type AppThunkDispatch = ThunkDispatch<AppRootState, unknown, UnknownAction>

// @ts-ignore
window.store = store
