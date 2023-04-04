import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'row',
  title: 'Row',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'components',
      title: 'Components',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'dzHero',
          title: 'Hero',
          type: 'dzHero',
        }),
        defineArrayMember({
          name: 'dzCard',
          title: 'Card',
          type: 'dzCard',
        }),
        defineArrayMember({
          name: 'dzEditorial',
          title: 'Editorial',
          type: 'dzEditorial',
        }),
        defineArrayMember({
          name: 'dzInterstitial',
          title: 'Interstitial',
          type: 'dzInterstitial',
        }),
        defineArrayMember({
          name: 'dzSplit',
          title: 'Split',
          type: 'dzSplit',
        }),
        defineArrayMember({
          name: 'dzTitle',
          title: 'Title',
          type: 'dzTitle',
        }),
      ],
    }),
  ],
})
