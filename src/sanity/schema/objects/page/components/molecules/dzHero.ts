import {ComposeIcon, EditIcon, MasterDetailIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export interface DzHeroSchemaProps {
  title: string
  headingOverride?: string
  subHeadingOverride?: string
  secondaryTitleOverride?: string
  descriptionOverride?: string
  imageOverride?: any
  enableOverrides: boolean
}

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
      name: 'headingOverride',
      type: 'string',
      title: 'Heading',
      group: 'overrides',
    }),
    defineField({
      name: 'subHeadingOverride',
      type: 'string',
      title: 'SubHeading',
      group: 'overrides',
    }),
    defineField({
      name: 'secondaryTitleOverride',
      type: 'string',
      title: 'Secondary Title',
      group: 'overrides',
    }),
    defineField({
      name: 'descriptionOverride',
      type: 'string',
      title: 'Description',
      group: 'overrides',
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
        {
          name: 'url',
          type: 'string',
          title: 'Url redirect',
        },
      ],
    }),
  ],
})
