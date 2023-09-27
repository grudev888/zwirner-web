import {groq} from 'next-sanity'
import {z} from 'zod'

// Must follow DzTitleTypeProps
export const dzTitleFields = groq`
  "_type": "dzTitle",
  'props': {
    title,
    enableOverrides,
  }
`

export const dzTitleProps = groq`
  _type == 'dzTitle' => {
    ${dzTitleFields}
  },
`

export const DzTitlePropsDataSchema = z.object({
  title: z.nullable(z.string()),
  enableOverrides: z.boolean(),
})
