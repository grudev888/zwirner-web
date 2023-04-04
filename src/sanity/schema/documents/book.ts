import {BookIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import artistType from './artist'
import author from './author'

export default defineType({
  name: 'book',
  title: 'Books',
  icon: BookIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'artists',
      title: 'Artists',
      type: 'array',
      of: [
        {
          type: 'reference',
          title: 'Artist',
          to: [{type: artistType.name}],
        },
      ],
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [
        {
          type: 'reference',
          title: 'Author',
          to: [{type: author.name}],
        },
      ],
    }),
    defineField({
      name: 'publisher',
      title: 'Publisher',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isbn',
      title: 'ISBN',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description, body',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
          ],
        },
      ],
    }),
    defineField({
      title: 'publishDate',
      name: 'dateSelection',
      type: 'dateSelection',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Book photos',
      name: 'photos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'price',
      type: 'number',
      title: 'Price',
      validation: (rule) => rule.required(),
      readOnly: ({currentUser}) => {
        return !currentUser?.roles.find(({name}) => name !== 'administrator')
      },
    }),
  ],
})
