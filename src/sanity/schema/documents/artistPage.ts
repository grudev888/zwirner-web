import {BlockElementIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import artist from './artist'

export default defineType({
  name: 'artistPage',
  title: 'Artist Page',
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
      name: 'artist',
      title: 'Artist',
      type: 'reference',
      to: [{type: artist.name}],
      validation: (rule) => rule.required(),
    }),
  ],
})
