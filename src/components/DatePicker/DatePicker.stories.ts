import { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
    title: 'UI/DatePicker',
    component: DatePicker,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
    },
  };

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = { };

