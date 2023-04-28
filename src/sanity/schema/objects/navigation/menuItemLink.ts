import {defineField, defineType} from 'sanity'

import {commonFields} from '../utils/menu'

export default defineType({
  type: 'object',
  name: 'menuItemLink',
  title: 'External link',
  preview: {select: {title: 'title'}},
  fields: [
    defineField({type: 'string', name: 'title', title: 'Title'}),
    defineField({
      name: 'link',
      title: 'External Link',
      type: 'url',
    }),
    defineField({
      type: 'boolean',
      name: 'newTab',
      title: 'Open in a new tab?',
      initialValue: true,
    }),
    ...commonFields,
  ],
})
