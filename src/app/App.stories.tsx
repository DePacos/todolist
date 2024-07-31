import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { App } from "./App"
import { ReduxStoreProviderDecorator } from "../stories/decorators/ReduxStoreProviderDecorator"
import { TodoListsList } from "../features/Todolists/TodoListsList"

const meta: Meta<typeof TodoListsList> = {
  title: "TODOLIST/App",
  component: TodoListsList,
  tags: ["autodocs"],
  decorators: [ReduxStoreProviderDecorator],
}

export default meta
type Story = StoryObj<typeof TodoListsList>

export const AppBaseExample = () => {
  return(
    <>
      <TodoListsList/>
    </>
  )
}
