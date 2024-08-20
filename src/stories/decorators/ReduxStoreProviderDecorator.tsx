import React from "react"
import { Provider } from "react-redux"
import { combineReducers } from "redux"
import { taskSlice } from "features/Task/model/taskSlice"
import { todolistSlice } from "features/Todolists/model/todolistSlice"
import { appSlice, RequestStatusType } from "../../app/appSlice"
import { authSlice } from "features/auth/model/authSlice"
import { configureStore } from "@reduxjs/toolkit"
import { thunk } from "redux-thunk"

const rootReducer = combineReducers({
  todolists: todolistSlice,
  tasks: taskSlice,
  app: appSlice,
  auth: authSlice,
})

const initialStoryState = {
  todolists: [
    { id: "111", title: "API", addedDate: "2024-06-22T18:14:51.42", order: -5, tasksFilter: "all", entityStatus: "idle", },
    { id: "222", title: "newTodolist456", addedDate: "2024-06-20T15:04:06.167", order: -4, tasksFilter: "all", entityStatus: "idle", },
  ],
  tasks: {
    ["111"]: [
      { id: "taskId111", title: 'testTitle111', description: null, todoListId: "111", order: -3, status: 1,
        priority: 1, startDate: null, deadline: null, addedDate: "2024-06-22T19:33:25.243", },
      { id: "taskId222", title: 'testTitle222', description: null, todoListId: '111', order: -3, status: 0,
        priority: 1, startDate: null, deadline: null, addedDate: "2024-07-22T19:33:25.243", },
    ],
    ["222"]: [
      { id: "taskId333", title: 'testTitle333', description: null, todoListId: "222", order: -3, status: 1,
        priority: 1, startDate: null, deadline: null, addedDate: "2024-01-22T19:33:25.243", },
      { id: "taskId444", title: 'testTitle444', description: null, todoListId: '222', order: -3, status: 0,
        priority: 1, startDate: null, deadline: null, addedDate: "2024-05-22T19:33:25.243", },
    ],
  },
  app: {
    isInitialized: true,
    status: "idle" as RequestStatusType,
    error: null as null | string,
  },
  auth:
     { isLoggedIn: true },
}

export const storyBookStore = configureStore({
  reducer: rootReducer,
  preloadedState: initialStoryState as AppRootStateStore,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

type AppRootStateStore = ReturnType<typeof rootReducer>

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}
    {/*<RouterProvider router={router}/>*/}
  </Provider>
}
