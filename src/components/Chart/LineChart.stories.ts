import { Meta, StoryObj } from '@storybook/react';
import { LineChartComp } from './LineChart'; // Update the path if needed

const meta: Meta<typeof LineChartComp> = {
  title: 'UI/LineChartComp',
  component: LineChartComp,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof LineChartComp>;

// Default story
export const Default: Story = { };