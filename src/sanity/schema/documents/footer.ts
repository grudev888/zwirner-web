import {BlockElementIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

import location from './location'
import page from './page'

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  icon: BlockElementIcon,
  preview: {
    select: {pageTitle: 'page.title', docTitle: 'title', defaultNav: 'default'},
    prepare: ({defaultNav, pageTitle, docTitle}) => ({
      title: defaultNav ? `Default - ${docTitle}` : pageTitle,
    }),
  },
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the footer title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'default', title: 'Default footer?', type: 'boolean', initialValue: false}),
    defineField({
      name: 'page',
      title: 'Page',
      type: 'reference',
      hidden: (params) => params.parent.default === true,
      to: [{type: page.name}],
    }),
    defineField({
      name: 'locations',
      title: 'Locations',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'gallery',
          type: location.name,
        }),
      ],
    }),
  ],
})
