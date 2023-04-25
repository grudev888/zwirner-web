import {defineArrayMember, defineField, defineType} from 'sanity'

import artist from '../../documents/artist'

export default defineType({
  name: 'brickAndMortar',
  type: 'object',
  title: 'Brick and mortar',
  options: {
    collapsible: true,
    collapsed: false,
  },
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'artist',
      title: 'Artist',
      type: 'reference',
      to: [{type: artist.name}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Pictures',
      name: 'pictures',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            }),
            defineField({
              name: 'zoom',
              type: 'boolean',
              title: 'Zoom Image',
            }),
          ],
        }),
      ],
      options: {
        layout: 'grid',
      },
    }),
  ],
})
