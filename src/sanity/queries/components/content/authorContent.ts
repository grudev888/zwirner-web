import {groq} from 'next-sanity'
import {z} from 'zod'

import {mediaBuilder, MediaBuilderSchema} from '@/sanity/queries/components/builders/mediaBuilder'

export const authorContent = groq`
  _type == 'author' => {
    name,
    picture {
       ${mediaBuilder}
    },
  },
`

export const AuthorContentSchema = z.object({
  _type: z.literal('author'),
  name: z.nullable(z.string()),
  image: z.nullable(MediaBuilderSchema),
})
