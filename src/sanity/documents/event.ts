import {TagIcon} from '@sanity/icons'
import {defineField,defineType} from 'sanity'

import dateSelection from '../objects/utils/dateSelection'
import locationType from './location'

// check timezone
export default defineType({
  name: 'event',
  title: 'Event',
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
      name: 'eventPhotos',
      title: 'Event photos',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'eventLocation',
      title: 'Location',
      type: 'reference',
      to: [{type: locationType.name}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'eventType',
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
