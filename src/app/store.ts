import { todolistSlice } from "features/Todolists/model/todolistSlice"
import { taskSlice } from "features/Task/model/taskSlice"
import { thunk } from "redux-thunk"
import { appSlice } from "app/appSlice"
import { authSlice } from "features/auth/model/authSlice"
import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
  reducer: {
    todolists: todolistSlice,
    tasks: taskSlice,
    app: appSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
})

export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
