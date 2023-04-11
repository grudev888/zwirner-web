import {defineArrayMember,defineField, defineType} from 'sanity'

export default defineType({
  name: 'grid',
  title: 'Grid',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: false,
  },
  fields: [
    defineField({
      name: 'masonryGrid',
      type: 'boolean',
      title: 'Masonry grid',
      description: 'Enable masonry grid layout',
      validation: (rule) => rule.required(),
      initialValue: false,
    }),
    defineField({
      name: 'columnsDesktop',
      type: 'number',
      title: 'Desktop columns number',
      description: 'Desktop number of columns',
      validation: (rule) => rule.required(),
      options: {
        list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      },
    }),
    defineField({
      name: 'columnsMobile',
      type: 'number',
      title: 'Mobile columns number',
      description: 'Mobile number of columns',
      validation: (rule) => rule.required(),
      options: {
        list: [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      },
    }),
    defineField({
      name: 'sortField',
      title: 'Sort Field',
      description: 'Sorting field',
      type: 'string',
      options: {
        list: [
          {title: 'Date', value: 'date'},
          {title: 'Last Name', value: 'lastName'},
          {title: 'Title', value: 'title'},
        ],
      },
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      description: 'Ascending or descending order',
      type: 'string',
      options: {
        list: [
          {title: 'Ascending', value: 'asc'},
          {title: 'Descending', value: 'desc'},
        ],
      },
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
          name: 'dzHeroCarousel',
          title: 'Hero Carousel',
          type: 'dzHeroCarousel',
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
