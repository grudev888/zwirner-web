import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'grid',
  title: 'Grid',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: false,
  },
  fieldsets: [
    {
      name: 'columnSettings',
      title: 'Column Settings',
      options: {
        collapsible: true,
        collapsed: true,
        columns: 2,
      },
    },
    {
      name: 'sortingFilters',
      title: 'Sorting',
      options: {
        collapsible: true,
        collapsed: true,
        columns: 2,
      },
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Section name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'columnsDesktop',
      type: 'number',
      title: 'Desktop columns span',
      description: 'Number of desktop columns that the content occupies',
      fieldset: 'columnSettings',
      validation: (rule) => rule.required(),
      options: {
        list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      },
      initialValue: 12,
    }),
    defineField({
      name: 'columnsMobile',
      type: 'number',
      title: 'Mobile columns span',
      description: 'Number of mobile columns that the content occupies',
      fieldset: 'columnSettings',
      validation: (rule) => rule.required(),
      options: {
        list: [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      },
      initialValue: 12,
    }),
    defineField({
      name: 'masonryGrid',
      type: 'boolean',
      title: 'Masonry grid',
      description: 'Enable masonry grid layout',
      fieldset: 'columnSettings',
      validation: (rule) => rule.required(),
      initialValue: false,
    }),
    defineField({
      name: 'wrap',
      type: 'boolean',
      title: 'Wrap columns',
      description: 'Enable wrapping',
      fieldset: 'columnSettings',
      validation: (rule) => rule.required(),
      initialValue: false,
    }),
    defineField({
      name: 'sortField',
      title: 'Sort Field',
      description: 'Sorting field',
      type: 'string',
      fieldset: 'sortingFilters',
      options: {
        list: [
          {title: 'Date', value: 'date'},
          {title: 'Last Name', value: 'lastName'},
          {title: 'Title', value: 'title'},
        ],
      },
      initialValue: 'date',
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
      fieldset: 'sortingFilters',
      initialValue: 'asc',
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
