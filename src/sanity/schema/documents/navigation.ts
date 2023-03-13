import {BlockElementIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: BlockElementIcon,
  preview: {select: {title: 'title'}},
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the navigation title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})
