import {defineType} from 'sanity'

export default defineType({
  title: 'Accessible Image',
  name: 'accessibleImage',
  type: 'image',
  fields: [
    {
      name: 'caption',
      type: 'string',
      title: 'Caption',
      hidden: ({parent}) => !parent?.asset,
    },
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      description: 'Alternative text is required.',
      hidden: ({parent}) => !parent?.asset,
      validation: (Rule) => [Rule.required()],
    },
  ],
})
