import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    children: {
      control: 'text',
    },
    className: {
      control: 'text',
    },
    asChild: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

// Default button story
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
    size: 'default',
  },
};

// Destructive button story
export const Destructive: Story = {
  args: {
    children: 'Delete',
    variant: 'destructive',
  },
};

// Outline button story
export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};

// Secondary button story
export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

// Ghost button story
export const Ghost: Story = {
  args: {
    children: 'Ghost',
    variant: 'ghost',
  },
};

// Link button story
export const Link: Story = {
  args: {
    children: 'Link Button',
    variant: 'link',
  },
};

// Small size button story
export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
};

// Large size button story
export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
};

// Icon button story
export const Icon: Story = {
  args: {
    children: '🔍',
    size: 'icon',
  },
};