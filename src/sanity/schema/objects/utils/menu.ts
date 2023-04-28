import {defineField} from 'sanity'

export const commonFields = [
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
