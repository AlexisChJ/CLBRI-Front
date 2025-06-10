import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import ProfileContainer from './ProfileContainer'

const meta: Meta<typeof ProfileContainer> = {
  title: 'Components/ProfileContainer',
  component: ProfileContainer,
  decorators: [
    (Story) =>
      React.createElement(
        'div',
        { style: { position: 'relative', width: 380, height: 360 } },
        React.createElement(Story, null)
      ),
  ],
  argTypes: {
    onSave: { action: 'save' },
  },
}

export default meta

type Story = StoryObj<typeof ProfileContainer>

const defaultArgs = {
  name: 'Othón Berlanga',
  workplace: 'Tecnológico de Monterrey',
  phone: '+52 1 998 123 4567',
  email: 'othon.berlanga@example.com',
  address: "Av. Insurgentes Sur 123",
  city: "Ciudad de México",
  state: "CDMX",
  country: "México",
  postal_code: "03100"
}

export const Default: Story = {
  render: (args) =>
    React.createElement(
      ProfileContainer,
      args
    ),
  args: defaultArgs,
}

export const WithAvatar: Story = {
  render: (args) =>
    React.createElement(
      ProfileContainer,
      args
    ),
  args: {
    ...defaultArgs,
    avatarSrc: 'https://placekitten.com/200/200',
  },
}