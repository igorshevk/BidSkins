import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Divider, DividerProps } from './'

export default {
	title: 'atoms/Divider',
	component: Divider,
} as Meta

const Template: Story<DividerProps> = (args) => <Divider {...args} />

export const Normal = Template.bind({})
