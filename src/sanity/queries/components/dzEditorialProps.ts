import {groq} from 'next-sanity'
import {z} from 'zod'

// Must follow DzEditorialSchemaProps
export const dzEditorialFields = groq`
  "_type": "dzEditorial",
  'props': {
    title,
    quoteTitle,
    quoteFootNote,
    editorialType,
    editorialTextOverrides,
    editorialTextOverridesSimple,
    imageOverride,
    reverse
  }
`

export const dzEditorialProps = groq`
  _type == 'dzEditorial' => {
    ${dzEditorialFields}
  },
`

const EditorialTypeSchema = z.enum(['quote', 'simple', 'complex'])
// TODO: define type instead any
export const DzEditorialPropsDataSchema = z.object({
  title: z.nullable(z.string()),
  quoteTitle: z.nullable(z.array(z.any())),
  quoteFootNote: z.nullable(z.array(z.any())),
  editorialType: EditorialTypeSchema,
  editorialTextOverrides: z.nullable(z.array(z.any())),
  editorialTextOverridesSimple: z.nullable(z.array(z.any())),
  imageOverride: z.nullable(z.any()),
  reverse: z.nullable(z.boolean()),
})
