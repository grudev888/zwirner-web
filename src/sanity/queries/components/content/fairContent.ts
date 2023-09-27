import {groq} from 'next-sanity'
import {z} from 'zod'

import {mediaBuilder, MediaBuilderSchema} from '../builders/mediaBuilder'
import {SanitySlugSchema} from '../validationPrimitives'

export const fairSimpleFields = groq`
  _id,
  _type,
  title,
  slug,
  subtitle,
  summary,
  externalLinkToggle,
  externalLink,
  startDate,
  endDate,
  displayDate,
  status,
  eyebrow,
`
const FairStatusSchema = z.enum(['comingSoon', 'open', 'close'])

export const FairSimpleFieldsSchema = z.object({
  _id: z.string(),
  _type: z.literal('fairPage'),
  title: z.string(),
  slug: SanitySlugSchema,
  subtitle: z.string().nullish(),
  summary: z.nullable(z.array(z.any())),
  externalLinkToggle: z.boolean(),
  externalLink: z.nullable(z.string().url()),
  startDate: z.string(),
  endDate: z.string(),
  displayDate: z.nullable(z.string()),
  status: z.nullable(FairStatusSchema),
  eyebrow: z.nullable(z.string().max(100)),
})

export const fairComplexFields = groq`
  "artists": artists[]->,
  heroMedia {
    ${mediaBuilder}
  },
`

export const FairComplexFieldsSchema = z.object({
  artists: z.nullable(z.array(z.any())),
  heroMedia: z.nullable(MediaBuilderSchema),
})

// unused for now
export const fairPageContent = groq`
  _type == 'fairPage' => {
    ${fairSimpleFields}
    ${fairComplexFields}
  },
`

export const FairPageContentSchema = FairSimpleFieldsSchema.merge(FairComplexFieldsSchema)
