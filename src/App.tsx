import React from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";

const style = {
    'display': 'flex',
    'gap': '20px'
}

export type PropsTask = {
    id: number,
    title: string,
    isDone: boolean,
}

export const App = () => {
    return (
        <div className="App" style={style}>
            <Todolist title="What to learn" propsTask={tasks1}/>
            <Todolist data="03/05/2005" title="Songs" propsTask={tasks2}/>
            <Todolist title="Books" propsTask={[]}/>
        </div>
    );
}

const tasks1: PropsTask[] = [
    { id: 1, title: 'HTML&CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'ReactJS', isDone: false },
]

const tasks2 = [
    { id: 1, title: 'Hello world', isDone: true },
    { id: 2, title: 'I am Happy', isDone: false },
    { id: 3, title: 'Yo', isDone: false },
]