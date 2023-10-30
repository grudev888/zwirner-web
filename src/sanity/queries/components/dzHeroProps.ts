import {groq} from 'next-sanity'
import {z} from 'zod'

//  Must follow DzHeroSchemaProps
export const dzHeroFields = groq`
  "_type": "dzHero",
  'props': {
    title,
    headingOverride,
    subHeadingOverride,
    secondaryTitleOverride,
    descriptionOverride,
    imageOverride,
    enableOverrides,
  }
`

export const dzHeroProps = groq`
  _type == 'dzHero' => {
    ${dzHeroFields}
  },
`
// TODO: define type instead any
export const DzHeroPropsDataSchema = z.object({
  title: z.string().nullish(),
  headingOverride: z.nullable(z.string()),
  subHeadingOverride: z.nullable(z.string()),
  secondaryTitleOverride: z.nullable(z.string()),
  descriptionOverride: z.nullable(z.string()),
  imageOverride: z.nullable(z.any()),
  enableOverrides: z.boolean(),
})
