import {ComposeIcon, EditIcon, MasterDetailIcon} from '@sanity/icons'
import {SplitTypes} from '@zwirner/design-system'
import {defineField, defineType} from 'sanity'

export interface DzSplitTypeProps {
  title: string
  splitType: SplitTypes
  reverse: boolean
  animate: boolean
  imageOverride?: any
}

export default defineType({
  name: 'dzSplit',
  title: 'Split',
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
      name: 'splitType',
      type: 'string',
      group: 'content',
      options: {
        list: [
          {title: 'Tall', value: 'tall'},
          {title: 'Short', value: 'short'},
        ],
      },
      initialValue: 'short',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'reverse',
      title: 'Reverse row',
      type: 'boolean',
      group: 'content',
      initialValue: false,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'animate',
      title: 'Animate image',
      type: 'boolean',
      group: 'content',
      initialValue: false,
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
