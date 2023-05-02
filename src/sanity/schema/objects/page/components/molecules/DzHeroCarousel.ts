import {ComposeIcon, EditIcon, MasterDetailIcon} from '@sanity/icons'
import {defineArrayMember,defineField, defineType} from 'sanity'

export interface DzHeroCarouselSchemaProps {
  title: string
  headingOverride?: string
  pictures?: any
  enableOverrides: boolean
}

export default defineType({
  name: 'dzHeroCarousel',
  title: 'Hero Carousel',
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
      type: 'pageContentList',
      group: 'content',
    }),
    defineField({
      name: 'enableOverrides',
      type: 'boolean',
      title: 'Enable Overrides',
      group: 'overrides',
      initialValue: false
    }),
    defineField({
      name: 'headingOverride',
      type: 'string',
      title: 'Heading',
      group: 'overrides',
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
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
          ],
        }),
      ],
      options: {
        layout: 'grid',
      },
    }),
  ],
})
