import {ComposeIcon, EditIcon, MasterDetailIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'dzCard',
  title: 'Card',
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'primaryCTA',
      title: 'Primary CTA',
      type: 'cta',
      group: 'content',
    }),
    defineField({
      name: 'secondaryCTA',
      title: 'Secondary CTA',
      type: 'cta',
      group: 'content',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'pageContent',
      group: 'content',
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
