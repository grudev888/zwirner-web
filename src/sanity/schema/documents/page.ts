import { defineType, defineField } from 'sanity'
import {MasterDetailIcon} from '@sanity/icons'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: MasterDetailIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'exhibition',
      title: 'Exhibition',
      type: 'reference',
      to: [{ type: 'exhibition' }],
    })
  ]
})