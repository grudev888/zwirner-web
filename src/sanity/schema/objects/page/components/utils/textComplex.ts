import {defineField, defineType} from 'sanity'

export default defineType({
  title: 'Text complex',
  name: 'textComplex',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      type: 'string',
      title: 'Text',
    }),
    defineField({
      title: 'Type',
      name: 'textType',
      type: 'string',
      options: {
        list: [
          {title: 'Paragraph', value: 'paragraph'},
          {title: 'Quote', value: 'quote'},
          {title: 'Heading', value: 'heading'},
        ],
      },
      initialValue: 'simple',
    }),
  ],
})
