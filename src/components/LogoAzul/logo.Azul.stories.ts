import type { Meta, StoryObj } from '@storybook/react';
import { BlueLogo } from './logoAzul'; // Adjust path if needed

const meta: Meta<typeof BlueLogo> = {
  title: 'Components/BlueLogo',
  component: BlueLogo,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof BlueLogo>;

export const Default: Story = {};
