import React from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {data} from "./redux/data";

export const App = () => {
    return (
        <div className="App">
            <Todolist title="What to learn" propsTask={data.tasks1}/>
            <Todolist title="Songs" propsTask={data.tasks2} data="03/05/2005"/>
            <Todolist title="Books" propsTask={[]}/>
        </div>
    );
}
