import {MasterDetailIcon} from '@sanity/icons'
import {defineArrayMember,defineType} from 'sanity'

export default defineType({
  name: 'pageContentList',
  title: 'ContentSlides',
  type: 'array',
  icon: MasterDetailIcon,
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
