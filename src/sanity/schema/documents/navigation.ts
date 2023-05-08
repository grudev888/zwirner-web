import {BlockElementIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import menu from '../objects/navigation/menu'

export default defineType({
  name: 'navigation',
  title: 'Header',
  type: 'document',
  icon: BlockElementIcon,
  preview: {prepare: () => ({title: 'Header'})},
  fields: [
    defineField({
      name: 'Menu',
      type: menu.name,
    }),
  ],
})
