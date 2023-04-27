import {defineField, defineType} from 'sanity'

interface externalLinkType {
  href: string
  blank: boolean
}

export interface linkSchemaType {
  externalLink?: externalLinkType
  internalLink?: string
}

export default defineType({
  name: 'link',
  type: 'object',
  title: 'Link',
  options: {
    collapsible: true,
    collapsed: false,
  },
  fields: [
    defineField({
      name: 'externalLink',
      type: 'object',
      title: 'External link',
      fields: [
        {
          name: 'href',
          type: 'url',
          title: 'URL',
        },
        {
          title: 'Open in new tab',
          name: 'blank',
          description: 'Read https://css-tricks.com/use-target_blank/',
          type: 'boolean',
        },
      ],
      hidden: ({parent, value}) => {
        return !!(!value && parent?.internalLink)
      },
    }),
    defineField({
      name: 'internalLink',
      type: 'url',
      hidden: ({parent, value}) => {
        return !!(!value && parent?.externalLink)
      },
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
          relativeOnly: true,
          scheme: ['https', 'http', 'mailto'],
        }),
    }),
  ],
})
