import {defineType} from 'sanity'

export default defineType({
  title: 'Accessible Image',
  name: 'accessibleImage',
  type: 'image',
  options: {hotspot: true},
  fields: [
    {
      name: 'caption',
      type: 'string',
      title: 'Caption',
      hidden: ({parent}) => !parent?.asset,
      options: {
        isHighlighted: true,
      },
    },
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      description: 'Alternative text is required.',
      hidden: ({parent}) => !parent?.asset,
      validation: (Rule) => [Rule.required()],
      options: {
        isHighlighted: true,
      },
    },
    {
      // Editing this field will be hidden behind an "Edit"-button
      name: 'attribution',
      type: 'string',
      title: 'Attribution',
    },
  ],
})
