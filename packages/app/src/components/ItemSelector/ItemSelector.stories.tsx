import type { Meta, StoryObj } from '@storybook/react'

import { ItemSelector } from './ItemSelector'

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'CaaTS/Components/ItemSelector',
  component: ItemSelector,
  decorators: [
    (Story) => (
      <div className="w-[510px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ItemSelector>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Cities: Story = {
  args: {
    items: ['W', 'G', 'B'],
    labels: ['Warszawa', 'Gdańsk', 'Bytom'],
    singleSelect: true,
  },
}

export const Subject: Story = {
  args: {
    items: ['I', 'G', 'A', 'Z', 'K', 'L'],
    labels: [
      'Informatyka',
      'Grafika',
      'Architektura',
      'Zarządzanie',
      'Kulturoznawstwo',
      'Lektorat/Studium Języków Obcych',
    ],
  },
}

export const Level: Story = {
  args: {
    items: ['I', 'II', 'III', 'PD'],
    labels: [
      'Studia I stopnia',
      'Studia II stopnia',
      'Studia III stopnia',
      'Studia podyplomowe',
    ],
  },
}

export const Semester: Story = {
  args: {
    items: Array.from({ length: 8 })
      .map<string | number>((_, i) => i + 1)
      .concat(['ITN']),
    labels: (v) => (typeof v === 'number' ? `Semestr ${v}` : String(v)),
  },
}

export const Mode: Story = {
  args: {
    items: ['s', 'n', 'i'],
    labels: ['Stacjonarnie', 'Zaocznie', 'Internetowo'],
    singleSelect: true,
  },
}
