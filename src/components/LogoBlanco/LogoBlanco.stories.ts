import type { Meta, StoryObj } from '@storybook/react';
import { WhiteLogo } from './LogoBlanco'; // Adjust path if needed

const meta: Meta<typeof WhiteLogo> = {
  title: 'Components/BlueLogo',
  component: WhiteLogo,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof WhiteLogo>;

export const Default: Story = {};