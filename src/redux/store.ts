import {combineReducers, createStore} from "redux";
import {todolistReducer} from "../model/todolist-reducer";
import {taskReducer} from "../model/task-reducer";


const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer,
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store