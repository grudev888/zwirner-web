import {groq} from 'next-sanity'
import {z} from 'zod'

import {mediaBuilder} from './builders/mediaBuilder'

// Must follow DzSplitTypeProps
export const dzSplitFields = groq`
  "_type": "dzSplit",
  'props': {
    titleOverride,
    subtitleOverride,
    splitType,
    reverse,
    media {
      ${mediaBuilder}
    },
    primaryCTA
  }
`
export const dzSplitProps = groq`
  _type == 'dzSplit' => {
    ${dzSplitFields}
  },
`

const SplitTypeSchema = z.enum(['tall', 'short'])

// TODO: define type instead any
// props: DzSplitPropsDataSchema
export const DzSplitPropsDataSchema = z.object({
  titleOverride: z.nullable(z.string()),
  subtitleOverride: z.nullable(z.string()),
  splitType: SplitTypeSchema,
  reverse: z.boolean(),
  animate: z.boolean().nullish(),
  media: z.nullable(z.any()),
  primaryCTA: z.nullable(z.any()),
})

export type DzSplitPropsDataSchemaType = z.infer<typeof DzSplitPropsDataSchema>
