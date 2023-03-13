import {UsersIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

import artworkType from './artwork'
import bookType from './book'

export default defineType({
  name: 'collection',
  title: 'Collections',
  icon: UsersIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
    }),
    defineField({
      name: 'artworks',
      title: 'Artworks',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: artworkType.name}],
        }),
      ],
    }),
    defineField({
      name: 'books',
      title: 'Books',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: bookType.name}],
        }),
      ],
    }),
  ],
})
