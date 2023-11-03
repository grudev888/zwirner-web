import {groq} from 'next-sanity'
import {z} from 'zod'

import {mediaBuilder, MediaBuilderSchema} from './builders/mediaBuilder'

// Must follow DzInterstitialTypeProps
export const dzInterstitialFields = groq`
  "_type": "dzInterstitial",
  'props': {
    title,
    mode,
    cta {
      ...,
      'downloadDoc': file.asset->url,
      'linkedContent': linkedContent->slug.current
    },
    image {
      ${mediaBuilder}
    },
    subtitle,
    eyebrow
  }
`
export const dzInterstitialProps = groq`
  _type == 'dzInterstitial' => {
    ${dzInterstitialFields}
  },
`

const ModeSchema = z.enum(['Light', 'Dark'])
// TODO: define type instead any
// props: DzInterstitialPropsDataSchema
export const DzInterstitialPropsDataSchema = z.object({
  title: z.nullable(z.string()),
  mode: z.nullable(ModeSchema),
  cta: z.nullable(z.any()),
  image: z.nullable(MediaBuilderSchema),
  subtitle: z.nullable(z.string()),
  eyebrow: z.nullable(z.string()),
})
