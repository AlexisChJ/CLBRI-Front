import type { Meta, StoryObj } from '@storybook/react';
import Ventana from './Ventana';
import { Button } from '../ui/button';

const meta: Meta<typeof Ventana> = {
  title: 'Components/Ventana',
  component: Ventana,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Ventana>;

export const Default: Story = {
  args: {
    triggerComponent: (<Button>Open Dialog</Button>),
    title: 'Default Dialog',
    children: (
      <div className="p-4">
        <p>This is the default dialog content.</p>
      </div>
    ),
  },
};

export const WithoutTitle: Story = {
  args: {
    triggerComponent: (<Button>Open Dialog</Button>),
    children: (
      <div className="p-4">
        <p>This dialog has no title.</p>
      </div>
    ),
  },
};

export const WithCustomTrigger: Story = {
  args: {
    triggerComponent: (
      <div className="flex items-center gap-2 p-2 border rounded-md hover:bg-gray-100 cursor-pointer">
        <span>📋</span>
        <span>Open Dialog</span>
      </div>
    ),
    title: 'Custom Trigger Dialog',
    children: (
      <div className="p-4">
        <p>This dialog uses a custom trigger component.</p>
      </div>
    ),
  },
};