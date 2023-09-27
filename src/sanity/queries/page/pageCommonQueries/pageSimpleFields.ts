import {groq} from 'next-sanity'
import {z} from 'zod'

import {SanitySlugSchema} from '../../components/validationPrimitives'

export const pageSimpleFields = groq`
  _id,
  _type,
  slug,
  title,
`

export const PageSimpleFieldsSchema = z.object({
  _id: z.string(),
  _type: z.literal('page'),
  slug: SanitySlugSchema,
  title: z.string(),
})
