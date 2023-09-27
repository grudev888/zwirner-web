import {groq} from 'next-sanity'
import {z} from 'zod'

import {
  exhibitionComplexFields,
  ExhibitionPageContentSchema,
  exhibitionSimpleFields,
} from '../../components/content/exhibitionPageContent'

export const pageComplexFields = groq`
   exhibitionPage-> {
     ${exhibitionSimpleFields}
     ${exhibitionComplexFields}
   },
`

export const PageComplexFieldsSchema = z.object({
  exhibitionPage: ExhibitionPageContentSchema,
})
