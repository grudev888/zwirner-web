import {ComposeIcon, EditIcon, MasterDetailIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {CTASchemaType} from '@/sanity/schema/objects/utils/cta'
export interface DzCardSchemaProps {
  title: string
  image?: any
  primaryCTA?: CTASchemaType
  secondaryCTA?: CTASchemaType
  enableOverrides: boolean
  imageOverride?: any
}

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
    // Content is not part of the props
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
    defineField({
      name: 'imageOverride',
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
