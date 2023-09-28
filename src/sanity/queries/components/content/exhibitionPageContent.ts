import {groq} from 'next-sanity'
import {z} from 'zod'

import {mediaBuilder, MediaBuilderSchema} from '../builders/mediaBuilder'
import {SanitySlugSchema} from '../validationPrimitives'

export const exhibitionSimpleFields = groq`
  _id,
  _type,
  title,
  slug,
  subtitle,
  summary,
  startDate,
  endDate,
  displayDate,
  status,
  eyebrow,
`
const ExhibitionStatusSchema = z.enum(['comingSoon', 'open', 'close'])

export const ExhibitionSimpleFieldsSchema = z.object({
  _id: z.string(),
  _type: z.literal('exhibitionPage'),
  title: z.string(),
  slug: SanitySlugSchema,
  subtitle: z.string().nullish(),
  summary: z.nullable(z.array(z.any())),
  startDate: z.string(),
  endDate: z.string(),
  displayDate: z.nullable(z.string()),
  status: z.nullable(ExhibitionStatusSchema),
  eyebrow: z.nullable(z.string()),
})

export const exhibitionComplexFields = groq`
  photos[],
  "artists": artists[]->,
  "artworks": artworks[]->,
  "collections": collections[]->,
  "locations": locations[]->,
  heroMedia {
    ${mediaBuilder}
  }
`

export const ExhibitionComplexFieldsSchema = z.object({
  photos: z.nullable(z.array(z.any())),
  artists: z.nullable(z.array(z.any())),
  artworks: z.nullable(z.array(z.any())),
  collections: z.nullable(z.array(z.any())),
  locations: z.nullable(z.array(z.any())),
  heroMedia: z.nullable(MediaBuilderSchema),
})

export const exhibitionPageContent = groq`
  _type == 'exhibitionPage' => {
    ${exhibitionSimpleFields}
    ${exhibitionComplexFields}
  },
`

export const ExhibitionPageContentSchema = ExhibitionSimpleFieldsSchema.merge(
  ExhibitionComplexFieldsSchema
)
