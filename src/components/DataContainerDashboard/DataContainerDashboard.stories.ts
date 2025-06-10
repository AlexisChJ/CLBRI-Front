import type { Meta, StoryObj } from '@storybook/react';
import DataContainerDashboard from './DataContainerDashboard'; // ajusta la ruta si es necesario

const meta: Meta<typeof DataContainerDashboard> = {
  title: 'Components/DataContainerDashboard',
  component: DataContainerDashboard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DataContainerDashboard>;

export const Default: Story = {};
