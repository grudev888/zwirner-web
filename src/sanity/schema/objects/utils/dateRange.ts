import {defineField} from 'sanity'

export type DateRange = {
  _type: 'dateRange'
  from: 'string'
  to: 'string'
}

export default defineField({
  name: 'dateRange',
  title: 'Date Range',
  type: 'object',
  options: {columns: 2},
  fields: [
    defineField({
      name: 'from',
      type: 'datetime',
      validation: (rule) =>
        rule.custom((value, {parent}) => {
          const {to} = parent as DateRange
          return value && to && new Date(value) > new Date(to)
            ? `"Display from" must be before "display to"`
            : true
        }),
    }),
    defineField({
      name: 'to',
      type: 'datetime',
      validation: (rule) =>
        rule.custom((value, {parent}) => {
          const {from} = parent as DateRange
          return value && from && new Date(value) < new Date(from)
            ? `"Display to" must be after "display from"`
            : true
        }),
    }),
  ],
})
