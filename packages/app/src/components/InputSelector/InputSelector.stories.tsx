import type { Meta, StoryObj } from '@storybook/react'

import { InputSelector } from './InputSelector'

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'CaaTS/Components/InputSelector',
  component: InputSelector,
  decorators: [
    (Story) => (
      <div className="w-[410px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InputSelector>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Default: Story = {
  args: {},
}
