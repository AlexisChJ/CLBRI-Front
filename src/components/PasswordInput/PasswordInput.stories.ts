import { Meta, StoryObj } from '@storybook/react';
import { PasswordInput } from './PasswordInput';

const meta: Meta<typeof PasswordInput> = {
  title: 'UI/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    placeholder: "Contraseña",
  },
  argTypes: {
    disabled: { control: 'boolean' },
    value: { control: 'text' },
  }
};

export default meta;

type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = { }

export const Toggle: Story = {
    args: {
        disabled: false,
        value: "Contraseña123",
    }
}
