import {defineField, defineType} from 'sanity'

import page from '../../documents/page'
import artistPage from '../../documents/pages/artistPage'
import exhibitionPage from '../../documents/pages/exhibitionPage'
import fairPage from '../../documents/pages/fairPage'
import {commonFields} from '../utils/menu'

export default defineType({
  type: 'object',
  name: 'menuItemPage',
  title: 'Internal page',
  preview: {select: {title: 'title'}},
  fields: [
    defineField({type: 'string', name: 'title', title: 'Title'}),
    defineField({
      name: 'page',
      title: 'Page',
      type: 'reference',
      to: [
        {type: page.name},
        {type: artistPage.name},
        {type: exhibitionPage.name},
        {type: fairPage.name},
      ],
    }),
    defineField({
      type: 'boolean',
      name: 'newTab',
      title: 'Open in a new tab?',
      initialValue: true,
    }),
    ...commonFields,
  ],
})
