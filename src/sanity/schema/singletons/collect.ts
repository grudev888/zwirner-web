import {ComposeIcon, SearchIcon} from '@sanity/icons'
import {BlockElementIcon} from '@sanity/icons'
import {defineArrayMember,defineField, defineType} from 'sanity'

export default defineType({
  name: 'collect',
  title: 'Collect',
  type: 'document',
  icon: BlockElementIcon,
  preview: {select: {title: 'title'}},
  groups: [
    {name: 'content', title: 'Content', icon: ComposeIcon, default: true},
    {name: 'seo', title: 'SEO', icon: SearchIcon},
  ],
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'grid',
      title: 'Grid',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          name: 'grid',
          title: 'Grid',
          type: 'grid',
        }),
      ],
    }),
  ],
})
