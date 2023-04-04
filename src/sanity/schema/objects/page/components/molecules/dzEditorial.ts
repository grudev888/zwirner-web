import {ComposeIcon, EditIcon, MasterDetailIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'dzEditorial',
  title: 'Editorial',
  type: 'object',
  icon: MasterDetailIcon,
  groups: [
    {name: 'content', title: 'Content', icon: ComposeIcon, default: true},
    {name: 'overrides', title: 'Overrides', icon: EditIcon},
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Component title',
      group: 'content',
    }),
    defineField({
      title: 'Type',
      name: 'editorialType',
      type: 'string',
      group: 'content',
      options: {
        list: [
          {title: 'Simple', value: 'simple'},
          {title: 'Complex', value: 'complex'},
          {title: 'Quote', value: 'quote'},
        ],
      },
      initialValue: 'simple',
    }),
    defineField({
      name: 'content',
      title: 'Editorial Content',
      type: 'editorialContent',
      group: 'content',
    }),
    defineField({
      name: 'editorialTextOverrides',
      title: 'Text Content',
      type: 'array',
      group: 'overrides',
      of: [{type: 'textComplex'}],
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      group: 'overrides',
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
    }),
  ],
})
