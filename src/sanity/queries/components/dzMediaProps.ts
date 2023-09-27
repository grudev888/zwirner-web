import {groq} from 'next-sanity'
import {z} from 'zod'

import {mediaBuilder, MediaBuilderSchema} from './builders/mediaBuilder'

// Must follow DzMediaSchemaProps
export const dzMediaFields = groq`
  "_type": "dzMedia",
  'props': {
    title,
    media {
      ${mediaBuilder}
    },
    caption
  }
`

export const dzMediaProps = groq`
  _type == 'dzMedia' => {
    ${dzMediaFields}
  },
`
// TODO: define type instead any
export const DzMediaPropsDataSchema = z.object({
  title: z.nullable(z.string()),
  media: z.nullable(MediaBuilderSchema),
  caption: z.nullable(z.array(z.any())),
})
