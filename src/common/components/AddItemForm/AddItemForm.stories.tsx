import type { Meta, StoryObj } from "@storybook/react"
import { AddItemForm } from "common/components/AddItemForm/AddItemForm"
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
      description: "BasicButton clicked inside form",
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
  args: {},
}

export const AddItemFormDisableStory: Story = {
  args: {
    disable: true,
  },
}

type Story = StoryObj<typeof AddItemForm>
export default meta
