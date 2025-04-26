import type { Meta, StoryObj } from '@storybook/react';
import { TablaBasica } from './TablaBasica'; // Adjust path if needed

const meta: Meta<typeof TablaBasica> = {
  title: 'Components/TablaBasica',
  component: TablaBasica,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TablaBasica>;

export const Default: Story = {};
