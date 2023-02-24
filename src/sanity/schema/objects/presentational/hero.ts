import { defineField, defineType } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export default defineType({
  name: 'heroObject',
  title: 'Hero',
  icon: DocumentIcon,
  type: 'object',
  fields: [
    defineField({
      name: 'categoryTitle',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Section Title or Headline',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subHeadline',
      title: 'Sub Headline',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subSubHeadline',
      title: 'Sub Sub Headline',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'btnText',
      title: 'Button Text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'reverse',
      title: 'Reverse cards',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'halfImage',
      title: 'Half Image',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
