import {groq} from 'next-sanity'
import {z} from 'zod'

import {pageSEOFields, PageSEOFieldsSchema} from '../components/seo/pageSEOFields'
import {
  pageBuilderComponentsData,
  PageBuilderComponentsDataSchema,
} from './pageCommonQueries/pageBuilderComponentsData'

// UNUSED
export const homePage = groq`
*[_type == "home"][0] {
  _id,
  _type,
  exceptionalWorkContent[] {
    ${pageBuilderComponentsData}
  },
  locations[]->,
  seo {
    ${pageSEOFields}
  },
}`

export const HomePageSchema = z.object({
  _id: z.string(),
  _type: z.literal('home'),
  exceptionalWorkContent: z.nullable(z.array(PageBuilderComponentsDataSchema)),
  locations: z.nullable(z.array(z.any())),
  seo: z.nullable(PageSEOFieldsSchema),
})
