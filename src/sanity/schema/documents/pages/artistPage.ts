import {BlockElementIcon, ComposeIcon, SearchIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {apiVersion} from '@/sanity/env'
import {artistById} from '@/sanity/queries/artist.queries'

import artist from '../artist'

export interface ArtistPageSchemaProps {
  title: string
  slug: any
  seo: any
  artist: any
}

export default defineType({
  name: 'artistPage',
  title: 'Artist Page',
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description:
        'To generate a unique slug based on the artist full name, please add an artist first.',
      type: 'slug',
      options: {
        source: (object: any, context) => {
          const artistRef = object?.artist?._ref
          const defaultSlug = object?.title ?? ''
          if (!defaultSlug)
            throw new Error('Please add a title or an artist to create a unique slug.')
          if (artistRef) {
            const {getClient} = context
            const client = getClient({apiVersion})
            const params = {artistId: artistRef}
            return client.fetch(artistById, params).then((result) => {
              const [artist] = result ?? []
              return artist?.fullName ?? defaultSlug
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
      name: 'artist',
      title: 'Artist',
      type: 'reference',
      group: 'content',
      to: [{type: artist.name}],
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
