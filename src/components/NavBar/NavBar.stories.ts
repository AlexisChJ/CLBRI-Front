import type { Meta, StoryObj } from '@storybook/react';
import { NavBar } from './NavBar';

const meta: Meta<typeof NavBar> = {
  title: 'Components/NavBar',
  component: NavBar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NavBar>;

export const Default: Story = {
  args: {
    title: 'Mi Aplicación',
    selected: 0,
    onValueChange: (index) => console.log('Selected tab:', index),
  },
};

export const WithoutNotifications: Story = {
  args: {
    title: 'Mi Aplicación',
    selected: 1,
    onValueChange: (index) => console.log('Selected tab:', index),
  },
};

export const LongTitle: Story = {
  args: {
    title: 'Sistema de Gestión de Proyectos Empresariales',
    selected: 2,
    onValueChange: (index) => console.log('Selected tab:', index),
  },
};