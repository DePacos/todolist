import {v1} from "uuid";

export const data = [
    {   id: 1,
        title: 'What to learn',
        date: '',
        tasks: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        tasksFilter: 'all'
    },
    {
        id: 2,
        title: 'Phrase',
        date: '01/10/2020',
        tasks: [
            {id: v1(), title: 'Hello world', isDone: true},
            {id: v1(), title: 'I am Happy', isDone: false},
            {id: v1(), title: 'Yo', isDone: false},
        ],
        tasksFilter: 'all'
    },
    {
        id: 3,
        title: 'Books',
        date: '',
        tasks: [],
        tasksFilter: 'all',
    },
]
