// Todo with the design system version update
// import {EditorialTextType} from '@zwirner/design-system'
import {defineField, defineType} from 'sanity'

export interface TextComplexSchemaType {
  text: string
  textType: any
}

export default defineType({
  title: 'Text complex',
  name: 'textComplex',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      type: 'string',
      title: 'Text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Type',
      name: 'textType',
      type: 'string',
      options: {
        list: [
          {title: 'Paragraph', value: 'paragraph'},
          {title: 'Quote', value: 'quote'},
        ],
      },
      initialValue: 'simple',
      validation: (rule) => rule.required(),
    }),
  ],
})
