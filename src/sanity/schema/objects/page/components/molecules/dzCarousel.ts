import {ComposeIcon, EditIcon, MasterDetailIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export interface DzCarouselSchemaProps {
  title: string
  enableOverrides: boolean
}

export default defineType({
  name: 'dzCarousel',
  title: 'Carousel',
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
      name: 'content',
      title: 'Content',
      type: 'pageContent',
      group: 'content',
    }),
    defineField({
      name: 'enableOverrides',
      type: 'boolean',
      title: 'Enable Overrides',
      group: 'overrides',
      initialValue: false
    }),
  ],
})
