import {v1} from "uuid";

export const
    data = [
    {   id: v1(),
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
        id: v1(),
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
        id: v1(),
        title: 'Books',
        date: '',
        tasks: [],
        tasksFilter: 'all',
    },
]


let idTodo1 = v1()
let idTodo2 = v1()
let idTodo3 = v1()

// for tests

export let idTasks1 = {
    id1: v1(),
    id2: v1(),
    id3: v1(),
    id4: v1(),
}

export let idTasks2 = {
    id1: v1(),
    id2: v1(),
    id3: v1(),
}

export const todoDataLists = [
        { id: idTodo1, title: 'What to learn', date: '', tasksFilter: 'all'},
        { id: idTodo2, title: 'Phrase', date: '01/10/2020', tasksFilter: 'all'},
        { id: idTodo3, title: 'Books', date: '', tasksFilter: 'all'},
    ]


export const tasksDataLists = {
    [idTodo1]:[
        {id: idTasks1.id1, title: 'HTML&CSS', isDone: true},
        {id: idTasks1.id2, title: 'JS', isDone: true},
        {id: idTasks1.id3, title: 'React', isDone: false},
        {id: idTasks1.id4, title: 'Redux', isDone: false},
    ],
    [idTodo2]:[
        {id: idTasks2.id1, title: 'Hello world', isDone: true},
        {id: idTasks2.id2, title: 'I am Happy', isDone: false},
        {id: idTasks2.id3, title: 'Yo', isDone: false},
    ],
    [idTodo3]:[]
}


