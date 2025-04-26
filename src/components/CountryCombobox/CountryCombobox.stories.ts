import { Meta, StoryObj } from '@storybook/react';
import { CountryCombobox } from './CountryCombobox';

const meta: Meta<typeof CountryCombobox> = {
  title: 'UI/CountryCombobox',
  component: CountryCombobox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof CountryCombobox>;

export const Default: Story = {};

