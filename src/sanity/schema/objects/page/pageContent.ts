import {MasterDetailIcon} from '@sanity/icons'
import {defineArrayMember, defineType} from 'sanity'

// Artists, artworks and exhibitions
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
      name: 'exhibition',
      title: 'Exhibition',
      type: 'reference',
      to: [{type: 'exhibition'}],
    }),
  ],
})
