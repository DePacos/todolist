import type { Meta, StoryObj } from "@storybook/react"
import { AddItemForm } from "./AddItemForm"
import { action } from "@storybook/addon-actions"

const meta = {
  title: "TODOLIST/AddItemForm",
  component: AddItemForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    addItem: {
      description: "Button clicked inside form",
      action: "clicked",
    },
    inputLabel: {
      description: "Change input label",
    },
    disable: {
      description: "On/Off disabled",
    },
  },
}

export const AddItemFormStory: Story = {
  args: {
    addItem: action("Button clicked inside form"),
  },
}

export const AddItemFormDisableStory: Story = {
  args: {
    addItem: action("Button clicked inside form"),
    disable: true,
  },
}

type Story = StoryObj<typeof AddItemForm>
export default meta
