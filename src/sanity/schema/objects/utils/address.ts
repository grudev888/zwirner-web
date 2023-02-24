import {defineField} from 'sanity'

export type Address = {
  _type: 'dateRange'
  from: 'string'
  to: 'string'
}

export default defineField({
  name: 'address',
  title: 'Address',
  type: 'object',
  options: {columns: 2},
  fields: [
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
    }),
    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
    }),
    defineField({
      name: 'zipCode',
      title: 'Zip Code',
      type: 'string',
    }),
  ],
})
