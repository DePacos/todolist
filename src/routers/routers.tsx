import React from 'react';
import {createBrowserRouter, Navigate} from "react-router-dom";
import {App} from '../app/App';
import {Login} from '../features/Login/Login'
import {TodoListsList} from '../features/Todolists/TodoListsList'
import {ErrorPage} from "../components/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <Navigate to="/404" />,
        children: [
            {
                index: true,
                element: <Navigate to="/todolists"/>
            },
            {
                path: "/login",
                element: <Login/>,
            },
            {
                path: "/todolists",
                element: <TodoListsList/>,
            },
        ],
    },
    {
        path: '404',
        element: <ErrorPage/>
    }
])