import {defineField, defineType} from 'sanity'

export interface BreadcrumbItemSchema {
  name: string,
  item: string
}

export default defineType({
  name: 'breadcrumbItem',
  type: 'object',
  title: 'BreadcrumbItem',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'item',
      type: 'string',
      title: 'Url',
      validation: (rule) => rule.required(),
    }),
  ],
})
