import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import LocationsMap from './mapa'

type Location = { lat: number; lng: number; title?: string }

const meta: Meta<typeof LocationsMap> = {
  title: 'Components/LocationsMap',
  component: LocationsMap,
  decorators: [
    (Story) =>
      React.createElement(
        'div',
        { style: { width: 600, height: 400, position: 'relative' } },
        React.createElement(Story, null)
      ),
  ],
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof LocationsMap>

const exampleAdmin: Location = {
  lat: 19.432608,
  lng: -99.133209,
  title: 'Admin HQ',
}

const exampleUsers: Location[] = [
  { lat: 19.427025, lng: -99.167665, title: 'User A' },
  { lat: 19.404048, lng: -99.158322, title: 'User B' },
  { lat: 19.435486, lng: -99.071678, title: 'User C' },
]

export const Default: Story = {
  render: (args) =>
    React.createElement(LocationsMap, args),
  args: {
    adminLocation: exampleAdmin,
    userLocations: exampleUsers,
  },
}