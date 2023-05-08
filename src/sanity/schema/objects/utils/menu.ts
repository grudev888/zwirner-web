import {defineField} from 'sanity'

export const menuCommonFields = [
  defineField({
    type: 'boolean',
    name: 'desktopEnabled',
    title: 'Enabled for desktop?',
    initialValue: true,
  }),
  defineField({
    type: 'boolean',
    name: 'mobileEnabled',
    title: 'Enabled for mobile?',
    initialValue: true,
  }),
]
