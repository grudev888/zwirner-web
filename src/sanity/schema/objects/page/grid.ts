import {MasterDetailIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'grid',
  title: 'Grid',
  type: 'object',
  icon: MasterDetailIcon,
  options: {
    collapsible: true,
    collapsed: false,
  },
  fieldsets: [
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
      name: 'masonryGrid',
      type: 'boolean',
      title: 'Masonry grid',
      description: 'Enable masonry grid layout',
      validation: (rule) => rule.required(),
      initialValue: false,
    }),
    defineField({
      name: 'wrap',
      type: 'boolean',
      title: 'Wrap columns',
      description: 'Enable wrapping',
      validation: (rule) => rule.required(),
      initialValue: false,
    }),
    defineField({
      name: 'itemsPerRow',
      type: 'number',
      title: 'Items per row',
      description: 'Number of components per row',
      validation: (rule) => rule.required(),
      options: {
        list: [1, 2, 3, 4],
      },
      initialValue: 1,
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
      type: 'pageBuilderComponents',
    }),
  ],
})
