import type {Meta, StoryObj} from '@storybook/react';
import {Task} from './Task';


const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        task: {
            id: 'id',
            title: 'title',
            description: 'desc',
            todoListId: 'todoID',
            order: -5,
            status: 5,
            priority: 7,
            startDate: 'startDate',
            deadline: 'deadline',
            addedDate: 'addedDate'
        }
    }
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsNotDoneStory: Story = {};

export const TaskIsDoneStory: Story = {

    args: {
        task: {
            id: 'id',
            title: 'title',
            description: 'desc',
            todoListId: 'todoID',
            order: -5,
            status: 5,
            priority: 7,
            startDate: 'startDate',
            deadline: 'deadline',
            addedDate: 'addedDate'
        }
    },
};
