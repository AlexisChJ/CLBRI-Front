import type { Meta, StoryObj } from '@storybook/react';
import NavBar from './NavBar';

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

const sampleNotifications = [
  {
    title: 'Nueva actualización',
    description: 'Se ha actualizado el sistema a la versión 2.0',
    creationDate: new Date('2024-03-20'),
  },
  {
    title: 'Recordatorio',
    description: 'No olvides completar tu perfil',
    creationDate: new Date('2024-03-19'),
  },
];

export const Default: Story = {
  args: {
    title: 'Mi Aplicación',
    opts: ['Inicio', 'Perfil', 'Configuración', 'Ayuda'],
    selected: 0,
    notificaciones: sampleNotifications,
    onValueChange: (index) => console.log('Selected tab:', index),
  },
};

export const WithoutNotifications: Story = {
  args: {
    title: 'Mi Aplicación',
    opts: ['Inicio', 'Perfil', 'Configuración'],
    selected: 1,
    notificaciones: [],
    onValueChange: (index) => console.log('Selected tab:', index),
  },
};

export const LongTitle: Story = {
  args: {
    title: 'Sistema de Gestión de Proyectos Empresariales',
    opts: ['Dashboard', 'Proyectos', 'Equipo', 'Reportes', 'Configuración'],
    selected: 2,
    notificaciones: sampleNotifications,
    onValueChange: (index) => console.log('Selected tab:', index),
  },
};