import {ComposeIcon, EditIcon, MasterDetailIcon} from '@sanity/icons'
import {EditorialType} from '@zwirner/design-system'
import {defineField, defineType} from 'sanity'

import {TextComplexSchemaType} from '@/sanity/schema/objects/utils/textComplex'

export interface DzEditorialSchemaProps {
  title: string
  editorialType: EditorialType
  editorialTextOverrides?: TextComplexSchemaType[]
  imageOverride?: any
}

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
      validation: (rule) => rule.required(),
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Editorial Content',
      type: 'editorialContent',
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
      name: 'editorialTextOverrides',
      title: 'Text Content',
      type: 'array',
      group: 'overrides',
      of: [{type: 'textComplex'}],
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
