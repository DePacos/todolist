import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { ReduxStoreProviderDecorator } from "stories/decorators/ReduxStoreProviderDecorator"
import { TodoListsList } from "features/Todolists/ui/TodoListsList"

const meta: Meta<typeof TodoListsList> = {
  title: "TODOLIST/App",
  component: TodoListsList,
  tags: ["autodocs"],
  decorators: [ReduxStoreProviderDecorator],
}

export default meta
type Story = StoryObj<typeof TodoListsList>

export const AppBaseExample = () => {
  return (
    <>
      <TodoListsList />
    </>
  )
}
