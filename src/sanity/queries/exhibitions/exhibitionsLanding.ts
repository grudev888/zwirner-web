import {groq} from 'next-sanity'
import {z} from 'zod'

import {mediaBuilder} from '../components/builders/mediaBuilder'
import {pageSEOFields, PageSEOFieldsSchema} from '../components/seo/pageSEOFields'
import {
  pageBuilderComponentsData,
  PageBuilderComponentsDataSchema,
} from '../page/pageCommonQueries/pageBuilderComponentsData'

// UNUSED
export const exhibitionsLanding = groq`
*[_type == "exhibitionsLanding"][0] {
  title,
  introContent[]{
    ${pageBuilderComponentsData}
  },
  seo {
    ${pageSEOFields}
  },
  interstitial {
    ...,
    image{${mediaBuilder}},
  }
}
`

export const ExhibitionsLandingSchema = z.object({
  title: z.string(),
  introContent: z.array(PageBuilderComponentsDataSchema),
  seo: PageSEOFieldsSchema,
  interstitial: z.any(),
})
