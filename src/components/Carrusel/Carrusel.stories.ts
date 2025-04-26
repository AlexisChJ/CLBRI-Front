import type { Meta, StoryObj } from '@storybook/react';
import Carrusel from './Carrusel';

const meta: Meta<typeof Carrusel> = {
  title: 'Components/Carrusel',
  component: Carrusel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Carrusel>;

export const Default: Story = {
  args: {
    data: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    onValueChange: (index) => console.log('Selected index:', index),
  },
};

export const Empty: Story = {
  args: {
    data: [],
    onValueChange: (index) => console.log('Selected index:', index),
  },
};

export const SingleItem: Story = {
  args: {
    data: ['Único día'],
    onValueChange: (index) => console.log('Selected index:', index),
  },
};