import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { TextInput } from './TextInput';  // adjust the path according to your project structure

// Default export containing component metadata for Storybook
const meta: Meta<typeof TextInput> = {
  title: 'UI/TextInput', // Define the section and name in the Storybook sidebar
  component: TextInput,   // The component that will be shown
  tags: ['autodocs'],     // Enables automatic docs generation
  argTypes: {
    // Optionally define the types of props that users can interact with in Storybook
    className: { control: 'text' }, // for the custom className prop
    placeholder: { control: 'text' }, // for the placeholder prop
    disabled: { control: 'boolean' }, // for the disabled state
  },
};

export default meta;

type Story = StoryObj<typeof TextInput>;

// Define different stories for various states

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    disabled: false,
  },
};

export const DisabledInput: Story = {
  args: {
    placeholder: 'Disabled input...',
    disabled: true,
  },
};

export const WithErrorState: Story = {
  args: {
    placeholder: 'Error state...',
    className: 'border-red-500 text-red-500',
    disabled: false,
  },
};

export const WithValue: Story = {
  args: {
    placeholder: 'Pre-filled input...',
    value: 'Hello World',
    disabled: false,
  },
};
