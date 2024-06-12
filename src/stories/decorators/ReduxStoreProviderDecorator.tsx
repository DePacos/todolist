import React from 'react'
import {Provider} from "react-redux";
import {combineReducers, legacy_createStore} from "redux";
import { taskReducer } from '../../model/task-reducer';
import {todolistReducer} from "../../model/todolist-reducer";
import {v1} from "uuid";

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", date: '', tasksFilter: 'all'},
        {id: "todolistId2", title: "What to buy", date: '01/10/2020', tasksFilter: 'all'},
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
};

// type AppRootStateStore = ReturnType<typeof rootReducer>

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as any);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
