import {defineArrayMember, defineField, defineType} from 'sanity'

import {menuCommonFields} from '../utils/menu'

export default defineType({
  name: 'menu',
  type: 'object',
  fields: [
    defineField({
      type: 'array',
      name: 'items',
      title: 'Items',
      of: [
        defineArrayMember({type: 'menuItemPage', name: 'menuItemPage'}),
        defineArrayMember({type: 'menuItemLink', name: 'menuItemLink'}),
        defineArrayMember({
          type: 'object',
          name: 'menuItemSubmenu',
          title: 'Submenu',
          preview: {select: {title: 'title'}},
          fields: [
            defineField({type: 'string', name: 'title', title: 'Title'}),
            defineField({
              name: 'submenu',
              title: 'Submenu',
              type: 'menu',
            }),
            ...menuCommonFields,
          ],
        }),
      ],
    }),
  ],
})
