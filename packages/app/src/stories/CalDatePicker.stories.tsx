import type { Meta, StoryObj } from '@storybook/react'
import { CalDatePicker } from '../components/CalDatePicker/CalDatePicker'

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'CaaTS/CalendarLikeDatePicker',
  component: CalDatePicker,
  decorators: [
    (Story) => (
      <div className="max-w-[390px] p-2">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    onClick: { action: 'clicked' },
  },
  // tags: ['autodocs'],
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} satisfies Meta<typeof CalDatePicker>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Default: Story = {
  args: {
    date: new Date(),
    busy: Array.from({ length: 31 }).map(() => Math.random() > 0.5),
  },
}
