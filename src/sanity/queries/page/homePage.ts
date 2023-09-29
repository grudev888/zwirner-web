import {groq} from 'next-sanity'
import {z} from 'zod'

import {pageSEOFields, PageSEOFieldsSchema} from '../components/seo/pageSEOFields'
import {
  pageBuilderComponentsData,
  PageBuilderComponentsDataSchema,
} from './pageCommonQueries/pageBuilderComponentsData'

export const homePage = groq`
*[_type == "home"][0] {
  _id,
  _type,
  homeContent[] {
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
  homeContent: z.nullable(z.array(PageBuilderComponentsDataSchema)),
  locations: z.nullable(z.array(z.any())),
  seo: z.nullable(PageSEOFieldsSchema),
})
