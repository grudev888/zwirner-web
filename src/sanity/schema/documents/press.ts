import { defineField, defineType } from 'sanity'
import { DocumentsIcon } from '@sanity/icons'
import locationType from './location'
import authorType from './author'

export default defineType({
  name: 'press',
  title: 'Press',
  icon: DocumentsIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [
        {
          type: 'reference',
          title: 'Author',
          to: [{ type: authorType.name }],
        },
      ],
    }),
    defineField({
      name: 'pressSummary',
      title: 'Summary',
      type: 'text',
    }),
    defineField({
      name: 'pressDescription',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'publishDate',
      type: 'datetime',
      title: 'Publish Date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'eventLocation',
      title: 'Location',
      type: 'reference',
      to: [{ type: locationType.name }],
    }),
    defineField({
      name: 'pressType',
      title: 'Press type',
      type: 'string',
      options: {
        list: [
          { title: 'Review', value: 'review' },
          { title: 'Article', value: 'article' },
        ],
      },
    }),
    defineField({
      name: 'language',
      title: 'language',
      type: 'string',
    }),
  ],
})
