import {TrendUpwardIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export interface GlobalSEOScheme {
  _id: string
  globalSEOTitle: string
  globalSEODescription: string
  globalSEOImage: any
}

export default defineType({
  name: 'globalSEO',
  title: 'Global SEO',
  type: 'document',
  icon: TrendUpwardIcon,
  fields: [
    defineField({
      name: 'globalSEOTitle',
      description: 'This text is added to the title tag on all pages. Maximum 70 characters.',
      title: 'Global Title',
      type: 'string',
      validation: (Rule) =>
        Rule.required().max(70).warning(`A title shouldn't be more than 70 characters.`),
    }),
    defineField({
      name: 'globalSEODescription',
      description:
        'This is meta the description on all pages where it is not defined. Maximum 160 characters.',
      title: 'Global Description',
      type: 'text',
      validation: (Rule) =>
        Rule.required().max(160).warning(`A title shouldn't be more than 160 characters.`),
    }),
    defineField({
      name: 'globalSEOImage',
      description:
        'This is the meta image presented in search and social on all pages where it is not defined.',
      title: 'Global Image',
      type: 'image',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
})
