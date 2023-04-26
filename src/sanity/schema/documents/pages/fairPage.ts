import {BlockElementIcon, ComposeIcon, SearchIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {apiVersion} from '@/sanity/env'
import {exhibitionById} from '@/sanity/queries/exhibition.queries'
import exhibition from '@/sanity/schema/documents/exhibition'

export default defineType({
  name: 'fairPage',
  title: 'Fair Page',
  type: 'document',
  icon: BlockElementIcon,
  groups: [
    {name: 'content', title: 'Content', icon: ComposeIcon, default: true},
    {name: 'seo', title: 'SEO', icon: SearchIcon},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description:
        'To generate a unique slug based on the exhibition title, please add an exhibition first.',
      type: 'slug',
      options: {
        source: (object: any, context) => {
          const exhibitionRef = object?.exhibition?._ref
          const defaultSlug = object?.title ?? ''
          if (!defaultSlug)
            throw new Error('Please add a title or an exhibition to create a unique slug.')
          if (exhibitionRef) {
            const {getClient} = context
            const client = getClient({apiVersion})
            const params = {exhibitionId: exhibitionRef}
            return client.fetch(exhibitionById, params).then((result) => {
              const [exhibition] = result ?? []
              return exhibition?.title ?? defaultSlug
            })
          }
          return defaultSlug
        },
        maxLength: 96,
      },
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
    defineField({
      name: 'exhibition',
      title: 'Exhibition',
      type: 'reference',
      group: 'content',
      to: [{type: exhibition.name}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'components',
      title: 'Components',
      type: 'pageBuilderComponents',
      group: 'content',
    }),
  ],
})
