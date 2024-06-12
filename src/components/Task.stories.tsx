import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import {Task} from './Task';



const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        changeTaskStatusHandler: action('Status changed inside Task'),
        changeTitleTaskHandler: action('Title changed inside Task'),
        removeTaskHandler: action('Remove Button clicked changed inside Task'),
        task: {id: '123', title: 'JS', isDone: false},
    }
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsNotDoneStory: Story = {};

export const TaskIsDoneStory: Story = {

    args: {
        task: {id: '123', title: 'CSS', isDone: true},
    },
};
