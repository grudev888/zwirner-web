import {groq} from 'next-sanity'
import {z} from 'zod'

import {componentTypesData, ComponentTypesDataSchema} from './componentTypesData'
import {dzCardProps, DzCardPropsDataSchema} from './dzCardProps'
import {dzMediaProps, DzMediaPropsDataSchema} from './dzMediaProps'

// Must follow DzCarouselSchemaProps
export const dzCarouselFields = groq`
  "_type": "dzCarousel",
  'props': {
    title,
    size,
    dzCarousel[]{
      ${componentTypesData}
      ${dzMediaProps}
      ${dzCardProps}
    }
  }
`
export const dzCarouselProps = groq`
  _type == 'dzCarousel' => {
    ${dzCarouselFields}
  },
`

const DzCarouselItemTypeSchema = z.enum(['dzCard', 'dzMedia'])
// TODO: define type instead any
// props: DzCarouselPropsDataSchema
export const DzCarouselPropsDataSchema = z.object({
  title: z.nullable(z.string()),
  size: z.enum(['XL', 'L', 'M', 'S']).nullish(),
  dzCarousel: z.nullable(
    z.array(
      z.object({
        content: ComponentTypesDataSchema,
        props: z.union([DzCardPropsDataSchema, DzMediaPropsDataSchema]),
        _type: DzCarouselItemTypeSchema,
      })
    )
  ),
})

export type DzCarouselPropsDataType = z.infer<typeof DzCarouselPropsDataSchema>
