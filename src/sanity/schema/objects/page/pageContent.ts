import {MasterDetailIcon} from '@sanity/icons'
import {defineArrayMember, defineType} from 'sanity'

export default defineType({
  name: 'pageContent',
  title: 'Content',
  type: 'array',
  icon: MasterDetailIcon,
  validation: (rule) => rule.max(1),
  of: [
    defineArrayMember({
      name: 'artist',
      title: 'Artist',
      type: 'reference',
      to: [{type: 'artist'}],
    }),
    defineArrayMember({
      name: 'artwork',
      title: 'Artwork',
      type: 'reference',
      to: [{type: 'artwork'}],
    }),
    defineArrayMember({
      name: 'book',
      title: 'Book',
      type: 'reference',
      to: [{type: 'book'}],
    }),
    defineArrayMember({
      name: 'exhibition',
      title: 'Exhibition',
      type: 'reference',
      to: [{type: 'exhibition'}],
    }),
    defineArrayMember({
      name: 'press',
      title: 'Press',
      type: 'reference',
      to: [{type: 'press'}],
    }),
  ],
})
