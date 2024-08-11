import { todolistSlice } from "features/Todolists/todolistSlice"
import { taskSlice } from "features/Task/taskSlice"
import { thunk } from "redux-thunk"
import { appReducer } from "app/appSlice"
import { authSlice } from "features/auth/authSlice"
import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
  reducer: {
    todolists: todolistSlice,
    tasks: taskSlice,
    app: appReducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
})

export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
