import {defineArrayMember, defineField, defineType} from 'sanity'

import page from '../../documents/page'
import artistPage from '../../documents/pages/artistPage'
import exhibitionPage from '../../documents/pages/exhibitionPage'
import fairPage from '../../documents/pages/fairPage'

export default defineType({
  name: 'menu',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        defineArrayMember({
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
              hidden: (params) => params.parent.submenu?.items?.length > 0,
              to: [
                {type: page.name},
                {type: artistPage.name},
                {type: exhibitionPage.name},
                {type: fairPage.name},
              ],
            }),
            defineField({
              name: 'submenu',
              title: 'Submenu',
              type: 'menu',
              hidden: (params) => !!params.parent.page?._type,
            }),
            defineField({
              type: 'boolean',
              name: 'desktopEnabled',
              title: 'Enabled for desktop?',
              initialValue: true,
            }),
            defineField({
              type: 'boolean',
              name: 'mobileEnabled',
              title: 'Enabled for mobile?',
              initialValue: true,
            }),
          ],
        }),
        defineArrayMember({
          type: 'object',
          name: 'menuItemLink',
          title: 'External link',
          preview: {select: {title: 'title'}},
          fields: [
            defineField({type: 'string', name: 'title', title: 'Title'}),
            defineField({
              name: 'link',
              title: 'External Link',
              type: 'url',
              hidden: (params) => params.parent.submenu?.items?.length > 0,
            }),
            defineField({
              name: 'submenu',
              title: 'Submenu',
              type: 'menu',
              hidden: (params) => !!params.parent.link,
            }),
            defineField({
              type: 'boolean',
              name: 'desktopEnabled',
              title: 'Enabled for desktop?',
              initialValue: true,
            }),
            defineField({
              type: 'boolean',
              name: 'mobileEnabled',
              title: 'Enabled for mobile?',
              initialValue: true,
            }),
          ],
        }),
      ],
    }),
  ],
})
