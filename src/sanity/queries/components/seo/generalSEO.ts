import {groq} from 'next-sanity'
import {z} from 'zod'

import {SanityImageSchema} from '../validationPrimitives'

// Must follow GlobalSEOScheme
export const generalSEOFields = groq`
  _id,
  globalSEOTitle,
  globalSEODescription,
  globalSEOImage
`

export const generalSEO = groq`
*[_type == "globalSEO"] {
  ${generalSEOFields}
}`

export const GeneralSEOSchema = z.object({
  _id: z.string(),
  globalSEOTitle: z.nullable(z.string().max(70)),
  globalSEODescription: z.nullable(z.string()),
  globalSEOImage: z.nullable(SanityImageSchema.merge(z.object({alt: z.nullable(z.string())}))),
})
