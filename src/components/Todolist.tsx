import React from 'react';

import {PropsTask} from "../App";
import {Button} from "./Button";

type TodolistProps = {
    title: string,
    propsTask: PropsTask[],
    data?: string,
}

export const Todolist = (props: TodolistProps) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            { (props.propsTask.length !== 0 ?
                    props.propsTask.map((item) => {
                        return (
                            <ul>
                                <li key={item.id}>
                                    <input type="checkbox" checked={item.isDone}/> <span>{item.title}</span>
                                </li>
                            </ul>
                        )
                    })
                : <span>No Tasks</span>
            )
            }
            {props.data}
            <div>
                <Button>All</Button>
                <Button>Active</Button>
                <Button>Completed</Button>
            </div>
        </div>
    );
}
