import {groq} from 'next-sanity'
import {z} from 'zod'

// Must follow DzHeroCarouselSchemaProps
export const dzHeroCarouselFields = groq`
  "_type": "dzHeroCarousel",
  'props': {
    title,
    headingOverride,
    pictures,
    enableOverrides,
  },
`

export const dzHeroCarouselProps = groq`
  _type == 'dzHeroCarousel' => {
    ${dzHeroCarouselFields}
  },
`

// TODO: define type instead any
export const DzHeroCarouselPropsDataSchema = z.object({
  title: z.nullable(z.string()),
  headingOverride: z.nullable(z.string()),
  pictures: z.array(z.any()),
  // pictures: z.array(z.object({alt: z.nullable(z.string())})),
  enableOverrides: z.boolean(),
})
