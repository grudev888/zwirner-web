import {BlockElementIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import exhibition from './exhibition'

export default defineType({
  name: 'exhibitionPage',
  title: 'Exhibition Page',
  type: 'document',
  icon: BlockElementIcon,
  preview: {select: {title: 'title'}},
  fields: [
    defineField({
      name: 'title',
      description: 'This field is a title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'exhibition',
      title: 'Exhibition',
      type: 'reference',
      to: [{type: exhibition.name}],
      validation: (rule) => rule.required(),
    }),
  ],
})
