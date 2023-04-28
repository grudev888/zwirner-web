import {BlockElementIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import menu from '../objects/navigation/menu'
import page from './page'

export default defineType({
  name: 'navigation',
  title: 'Header',
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
      description: 'This field is the navigation title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'default', title: 'Default header?', type: 'boolean', initialValue: false}),
    defineField({
      name: 'page',
      title: 'Page',
      type: 'reference',
      hidden: (params) => params.parent.default === true,
      to: [{type: page.name}],
    }),
    defineField({name: 'logo', type: 'image'}),
    defineField({
      name: 'Menu',
      type: menu.name,
    }),
  ],
})
