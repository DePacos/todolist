import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {todolistReducer} from "../model/todolist-reducer";
import {taskReducer} from "../model/task-reducer";
import {thunk, ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";



export type AppRootState = ReturnType<typeof rootReducer>
export type AppThunkDispatch = ThunkDispatch<AppRootState, any, AnyAction>

const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk) as any)

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();

// @ts-ignore
window.store = store