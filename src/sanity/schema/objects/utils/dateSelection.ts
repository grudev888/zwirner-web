import {defineField, defineType} from 'sanity'

import dateRange from './dateRange'

export default defineType({
  name: 'dateSelection',
  type: 'object',
  title: 'Date Selection',
  fields: [
    defineField({
      name: 'year',
      type: 'string',
      title: 'Year',
      hidden: ({parent, value}) => {
        return !!(!value && (parent?.dateRange?.from || parent?.approximate))
      },
    }),
    defineField({
      name: 'approximate',
      type: 'string',
      title: 'Approximate date',
      hidden: ({parent, value}) => {
        return !!(!value && (parent?.dateRange?.from || parent?.year))
      },
    }),
    defineField({
      name: 'dateRange',
      type: dateRange.name,
      hidden: ({parent, value}) => {
        return !!(!value?.from && (parent?.year || parent?.approximate))
      },
    }),
  ],
})
