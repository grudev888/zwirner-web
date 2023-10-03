import {groq} from 'next-sanity'
import {z} from 'zod'

import {mediaBuilder} from './builders/mediaBuilder'

export const dzCardFields = groq`
  "_type": "dzCard",
  'props': {
    title,
    primaryCTA,
    secondaryCTA,
    mediaOverride {
      ${mediaBuilder}
    },
    enableOverrides,
    secondaryTitle,
    bookVariation,
    primarySubtitle,
    secondarySubtitle,
    additionalInformation,
  }
`

export const dzCardProps = groq`
  _type == 'dzCard' => {
    ${dzCardFields}
  },
`
const BookVariationSchema = z.nullable(z.enum(['productCard', 'contentCard']))

// TODO: define type instead any
// props: DzCardPropsDataSchema
export const DzCardPropsDataSchema = z.object({
  title: z.string(),
  primaryCTA: z.nullable(z.any()),
  secondaryCTA: z.nullable(z.any()),
  mediaOverride: z.nullable(z.any()),
  enableOverrides: z.boolean(),
  secondaryTitle: z.nullable(z.string()),
  bookVariation: BookVariationSchema,
  primarySubtitle: z.nullable(z.string()),
  secondarySubtitle: z.nullable(z.string()),
  // TODO: https://www.sanity.io/docs/block-type
  additionalInformation: z.nullable(z.array(z.any())),
})
