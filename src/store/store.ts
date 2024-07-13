import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {todolistReducer} from "./reducers/todolist-reducer";
import {taskReducer} from "./reducers/task-reducer";
import {thunk, ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {appReducer} from "./reducers/app-reducers";
import {authReducer} from "./reducers/auth-reducer";



export type AppRootState = ReturnType<typeof rootReducer>
export type AppThunkDispatch = ThunkDispatch<AppRootState, any, AnyAction>

const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer,
    app: appReducer,
    auth: authReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk) as any)

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();

// @ts-ignore
window.store = store