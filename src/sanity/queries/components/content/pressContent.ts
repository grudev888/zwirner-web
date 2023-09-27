import {groq} from 'next-sanity'
import {z} from 'zod'

export const pressContent = groq`
  _type == 'press' => {
    ...,
    "authors": authors[]->
  },
`

const PressTypeSchema = z.enum(['review', 'article'])

export const PressContentSchema = z.object({
  title: z.string(),
  authors: z.nullable(z.array(z.any())),
  summary: z.nullable(z.string()),
  description: z.nullable(z.array(z.any())),
  publishDate: z.any(),
  url: z.string().url(),
  article: z.nullable(z.any()),
  location: z.nullable(z.any()),
  type: z.nullable(PressTypeSchema),
  language: z.nullable(z.string()),
})
