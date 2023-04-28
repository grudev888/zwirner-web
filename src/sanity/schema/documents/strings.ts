import {TiersIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'strings',
  type: 'document',
  icon: TiersIcon,
  title: 'Strings Manager',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      description: 'Section title',
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'inline',
          fields: [
            {type: 'string', name: 'title', title: 'Title'},
            {type: 'slug', name: 'identifier', title: 'Identifier'},
            {
              type: 'array',
              name: 'content',
              title: 'Content',
              of: [
                defineArrayMember({
                  type: 'block',
                  styles: [],
                  lists: [],
                  marks: {decorators: [{title: 'Bold', value: 'strong'}]},
                }),
              ],
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'content',
            },
          },
        }),
      ],
    }),
  ],
  preview: {select: {title: 'name'}},
})
