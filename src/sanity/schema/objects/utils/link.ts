import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'link',
  type: 'object',
  title: 'Link',
  fields: [
    defineField({
      name: 'external',
      type: 'url',
      title: 'URL',
      hidden: ({parent, value}) => {
        return !!(!value && parent?.internal)
      },
    }),
    defineField({
      name: 'internal',
      type: 'url',
      hidden: ({parent, value}) => {
        return !!(!value && parent?.external)
      },
    }),
  ],
})
