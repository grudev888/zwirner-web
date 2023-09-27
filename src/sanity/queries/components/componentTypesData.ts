import {groq} from 'next-sanity'
import {z} from 'zod'

import {articleContent, ArticleContentSchema} from './content/articleContent'
import {artistContent, ArtistContentSchema} from './content/artistContent'
import {artworkContent, ArtworkContentSchema} from './content/artworkContent'
import {bookContent, BookContentSchema} from './content/bookContent'
import {exhibitionPageContent, ExhibitionPageContentSchema} from './content/exhibitionPageContent'
import {locationContent, LocationContentSchema} from './content/locationContent'
import {podcastContent, PodcastContentSchema} from './content/podcastContent'
import {pressContent, PressContentSchema} from './content/pressContent'

export const fieldsPerType = groq`
  _type,
  ${exhibitionPageContent}
  ${artistContent}
  ${articleContent}
  ${artworkContent}
  ${bookContent}
  ${pressContent}
  ${locationContent}
  ${podcastContent}
`
export const componentTypesData = groq`
  content[]-> {
   ${fieldsPerType}
  },
`

// TODO: extend all content types with DzHeroRelatedContentSchema fields, remove this enhancement
export const wrappedContentPerMolecule = groq`
  _type == 'dzHero' => {
    content[]{
      title,
      videoOverride {
        type,
        videoReference->,
      },
      ...content[0]->{
        ${fieldsPerType}
      }
    }
  }
`

const DzHeroRelatedContentSchema = z.object({
  title: z.string(),
  // TODO: refine type depending on dzHero _type
  videoOverride: z
    .object({
      type: z.string(),
      videoReference: z.any(),
    })
    .nullish(),
})

export const FieldsPerTypeSchema = z.discriminatedUnion('_type', [
  ExhibitionPageContentSchema.merge(DzHeroRelatedContentSchema).extend({
    _type: z.literal('exhibitionPage'),
  }),
  ArtistContentSchema.merge(DzHeroRelatedContentSchema).extend({_type: z.literal('artist')}),
  ArticleContentSchema.merge(DzHeroRelatedContentSchema).extend({_type: z.literal('article')}),
  ArtworkContentSchema.merge(DzHeroRelatedContentSchema).extend({_type: z.literal('artwork')}),
  BookContentSchema.merge(DzHeroRelatedContentSchema).extend({_type: z.literal('book')}),
  LocationContentSchema.merge(DzHeroRelatedContentSchema).extend({_type: z.literal('press')}),
  PodcastContentSchema.merge(DzHeroRelatedContentSchema).extend({_type: z.literal('location')}),
  PressContentSchema.merge(DzHeroRelatedContentSchema).extend({_type: z.literal('podcast')}),
])

// content: ComponentTypesDataSchema
export const ComponentTypesDataSchema = z.nullable(z.array(FieldsPerTypeSchema))
