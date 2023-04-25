import {MasterDetailIcon} from '@sanity/icons'
import {defineArrayMember, defineType} from 'sanity'

// Books and press
export default defineType({
  name: 'editorialContent',
  title: 'Content',
  type: 'array',
  icon: MasterDetailIcon,
  validation: (rule) => rule.max(1),
  of: [
    defineArrayMember({
      name: 'book',
      title: 'Book',
      type: 'reference',
      to: [{type: 'book'}],
    }),
    defineArrayMember({
      name: 'press',
      title: 'Press',
      type: 'reference',
      to: [{type: 'press'}],
    }),
  ],
})
