import {groq} from 'next-sanity'
import {z} from 'zod'

import {SanitySlugSchema} from '../../components/validationPrimitives'

export const pageSimpleFields = groq`
  _id,
  _type,
  title,
  subtitle,
  slug,
  summary,
  eyebrow,
  franchiseBranding,
`

const FranchiseListTypes = z.enum(['Zwirner', 'Utopia', 'Exceptional Works'])

export const PageSimpleFieldsSchema = z.object({
  _id: z.string(),
  _type: z.literal('page'),
  title: z.string(),
  subtitle: z.nullable(z.string()),
  slug: SanitySlugSchema,
  summary: z.nullable(z.array(z.any())),
  eyebrow: z.nullable(z.string()),
  franchiseBranding: z.nullable(FranchiseListTypes),
})
