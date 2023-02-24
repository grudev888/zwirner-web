import { defineType, defineField, defineArrayMember } from 'sanity'
import {UsersIcon} from '@sanity/icons'
import bookType from './book'
import artworkType from './artwork'

export default defineType({
  name: 'collection',
  title: 'Collection',
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
          to: [{ type: artworkType.name }],
        }),
      ]
    }),
    defineField({
      name: 'books',
      title: 'Books',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: bookType.name }],
        }),
      ]
    })
  ]
})