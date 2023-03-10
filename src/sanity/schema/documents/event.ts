import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import dateSelection from '../objects/utils/dateSelection'
import locationType from './location'

// check timezone
export default defineType({
  name: 'event',
  title: 'Events',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'dateSelection',
      title: 'Dates',
      type: dateSelection.name,
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
    }),
    defineField({
      name: 'photos',
      title: 'Event photos',
      type: 'array',
      of: [{type: 'image'}],
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: [{type: locationType.name}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Preview', value: 'preview'},
          {title: 'Book signing', value: 'book-signing'},
          {title: 'Opening', value: 'opening'},
          {title: 'Exhibition', value: 'exhibition'},
          {title: 'Fair', value: 'fair'},
          {title: 'Popup', value: 'popup'},
        ],
      },
    }),
  ],
})
