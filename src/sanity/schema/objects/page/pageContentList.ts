import {MasterDetailIcon} from '@sanity/icons'
import {defineArrayMember, defineType} from 'sanity'

export default defineType({
  name: 'pageContentList',
  title: 'ContentSlides',
  type: 'array',
  icon: MasterDetailIcon,
  of: [{type: 'artist'}, {type: 'artwork'}, {type: 'exhibition'}],
})
