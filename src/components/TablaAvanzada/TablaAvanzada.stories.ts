import type { Meta, StoryObj } from '@storybook/react';
import TablaAvanzada from './TablaAvanzada'; 

const meta: Meta<typeof TablaAvanzada> = {
  title: 'Components/TablaAvanzada',
  component: TablaAvanzada,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TablaAvanzada>;

export const Default: Story = {};
