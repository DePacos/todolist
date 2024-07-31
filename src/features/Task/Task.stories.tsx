import type { Meta, StoryObj } from "@storybook/react"
import { Task } from "./Task"
import { ReduxStoreProviderDecorator } from "../../stories/decorators/ReduxStoreProviderDecorator"

const meta: Meta<typeof Task> = {
  title: "TODOLIST/Task",
  component: Task,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [ReduxStoreProviderDecorator],
  args: {
    task: {
     id: "id",
      title: "task title",
      description: "desc",
      todoListId: "todoID",
      order: -5,
      status: 5,
      priority: 7,
      startDate: "startDate",
      deadline: "deadline",
      addedDate: "addedDate",
    },
  },
}

export default meta
type Story = StoryObj<typeof Task>

export const TaskIsNotDoneStory: Story = {
  args: {
    task: {
      id: "id",
      title: "no check",
      description: "desc",
      todoListId: "todoID",
      order: -5,
      status: 0,
      priority: 7,
      startDate: "startDate",
      deadline: "deadline",
      addedDate: "addedDate",
    },
  },
}

export const TaskIsDoneStory: Story = {
  args: {
    task: {
      id: "id",
      title: "check",
      description: "desc",
      todoListId: "todoID",
      order: -5,
      status: 1,
      priority: 7,
      startDate: "startDate",
      deadline: "deadline",
      addedDate: "addedDate",
    },
  },
}
