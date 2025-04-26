import { Meta, StoryObj } from '@storybook/react';
import { TextInput } from './TextInput'; 

const meta: Meta<typeof TextInput> = {
  title: 'UI/TextInput', 
  component: TextInput,
  tags: ['autodocs'],  
  parameters: {
    layout: 'centered',
  },
  args: {
    placeholder: "Correo",
    value: "",
  },
  argTypes: {
    placeholder: { control: 'text' }, 
  },
};

export default meta;

type Story = StoryObj<typeof TextInput>;

export const Default: Story = { };

export const WithValue: Story = {
  args: {
    value: "correo@correo.com",
  },
};
