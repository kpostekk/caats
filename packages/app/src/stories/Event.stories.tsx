import type { Meta, StoryObj } from '@storybook/react'

import { ScheduleEvent } from '../components/ScheduleEvent/ScheduleEvent'

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'CaaTS/Event',
  component: ScheduleEvent,
  decorators: [
    (Story) => (
      <div className="max-w-[390px] p-2">
        <Story />
      </div>
    ),
  ],
  // tags: ['autodocs'],
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} satisfies Meta<typeof ScheduleEvent>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Default: Story = {
  args: {
    code: 'PRI',
    subject: 'Projektowanie Systemów Informacyjnych',
    start: new Date(),
    end: new Date(),
    room: 'A/312',
    type: 'Ćwiczenia',
  },
}

export const WithFocus: Story = {
  args: {
    code: 'PRI',
    subject: 'Projektowanie Systemów Informacyjnych',
    start: new Date(),
    end: new Date(),
    room: 'A/312',
    focused: true,
    type: 'Ćwiczenia',
  },
}

// export const Secondary: Story = {
//   args: {
//     label: 'Button',
//   },
// }

// export const Large: Story = {
//   args: {
//     size: 'large',
//     label: 'Button',
//   },
// }

// export const Small: Story = {
//   args: {
//     size: 'small',
//     label: 'Button',
//   },
// }
