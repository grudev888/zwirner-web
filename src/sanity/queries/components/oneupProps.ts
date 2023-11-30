import {groq} from 'next-sanity'
import {z} from 'zod'

import {dzCardFields, DzCardPropsDataSchema} from './dzCardProps'
import {dzMediaFields, DzMediaPropsDataSchema} from './dzMediaProps'

export const OneUpProps = groq`
  _type == 'oneUp' => {
    type == 'dzCard' => {
      ${dzCardFields}
    },
    type == 'dzMedia' => {
      ${dzMediaFields}
    },
  },
`

export const oneUpDataSchema = z.discriminatedUnion('type', [
  DzCardPropsDataSchema.extend({type: z.literal('dzCard')}),
  DzMediaPropsDataSchema.extend({type: z.literal('dzMedia')}),
])
