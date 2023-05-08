import {BlockElementIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import menuItemLink from '../objects/navigation/menuItemLink'
import menuItemPage from '../objects/navigation/menuItemPage'

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  icon: BlockElementIcon,
  preview: {prepare: () => ({title: 'Footer'})},
  fields: [
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{type: menuItemLink.name}, {type: menuItemPage.name}],
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'social',
    }),
  ],
})
