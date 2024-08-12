import type { Meta, StoryObj } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { EditableSpan } from "common/components/EditableSpan/EditableSpan"

const meta: Meta<typeof EditableSpan> = {
  title: "TODOLIST/EditableSpan",
  component: EditableSpan,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      description: "Start value empty. Add value push button set string.",
    },
    onChange: {
      description: "Value EditableSpan changed",
    },
    disable: {
      description: "On/Off disabled",
    },
  },
}

export default meta
type Story = StoryObj<typeof EditableSpan>

export const EditableSpanStory: Story = {
  args: {
    onChange: action("Value EditableSpan changed"),
    title: "test title",
  },
}
