import {useSelector} from "react-redux";
import {AppRootState, useAppDispatch} from "../../store/store";
import {createTaskTC, TasksType} from "../../store/reducers/task-reducer";
import React from "react";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import List from "@mui/material/List";
import {Task} from "./Task";

export const TasksList = React.memo(({todoId, tasksFilter, entityStatus}: TasksListProps) => {
    const tasks = useSelector<AppRootState, TasksType[]>(state => state.tasks[todoId])
    const dispatch = useAppDispatch()

    const createTasksHandler = React.useCallback((inputValue: string) => {
        dispatch(createTaskTC(todoId, inputValue))
    }, [])

    const getTasksFilter = (tasks: TasksType[]) => {
        if (tasksFilter === 'active') {
            return tasks.filter(task => task.status === 0)
        }

        if (tasksFilter === 'completed') {
            return tasks.filter(task => task.status === 1)
        }
        return tasks
    }

    return (
        <>
            <AddItemForm addItem={createTasksHandler} inputLabel='Task name' disable={entityStatus === 'loading'}/>
            <List>
                {getTasksFilter(tasks).length !== 0 ?
                    getTasksFilter(tasks).map(task => {
                        return (
                            <Task
                                key={task.id}
                                task={task}
                                disable={entityStatus === 'loading'}
                            />
                        )
                    })
                    : <span>No Tasks</span>
                }
            </List>
        </>
    )
})


type TasksListProps = {
    todoId: string
    tasksFilter: string
    entityStatus: string
}