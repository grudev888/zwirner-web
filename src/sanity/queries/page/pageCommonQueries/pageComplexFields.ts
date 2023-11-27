import {groq} from 'next-sanity'
import {z} from 'zod'

import {pageSEOFields, PageSEOFieldsWithTitleSchema} from '../../components/seo/pageSEOFields'
import {
  pageBuilderComponentsData,
  PageBuilderComponentsDataSchema,
} from './pageBuilderComponentsData'

export const pageComplexFields = groq`
 content[] {
    ${pageBuilderComponentsData}
  },
  "seo": {
    title,
    ...seo {
      ${pageSEOFields}
    }
  }
`

export const PageComplexFieldsSchema = z.object({
  seo: z.nullable(PageSEOFieldsWithTitleSchema),
  content: z.nullable(z.array(PageBuilderComponentsDataSchema)),
})
