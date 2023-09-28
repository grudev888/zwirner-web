import {groq} from 'next-sanity'
import {z} from 'zod'

import {pageSEOFields, PageSEOFieldsSchema} from '../../components/seo/pageSEOFields'
import {
  pageBuilderComponentsData,
  PageBuilderComponentsDataSchema,
} from './pageBuilderComponentsData'

export const pageComplexFields = groq`
 content[] {
    ${pageBuilderComponentsData}
  },
  seo {
    ${pageSEOFields}
  }
`

export const PageComplexFieldsSchema = z.object({
  seo: z.nullable(PageSEOFieldsSchema),
  content: z.nullable(z.array(PageBuilderComponentsDataSchema)),
})
