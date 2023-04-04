import {ComposeIcon, EditIcon, MasterDetailIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'dzHero',
  title: 'Hero',
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
      name: 'content',
      title: 'Content',
      type: 'pageContent',
      group: 'content',
    }),
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Heading',
      group: 'overrides',
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
