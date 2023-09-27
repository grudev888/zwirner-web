import {groq} from 'next-sanity'
import {z} from 'zod'

import {pageSEOFields} from '../components/seo/pageSEOFields'
import {componentsByData, ComponentsByDataScheme} from './pageCommonQueries/componentsByData'

// UNUSED
export const homePage = groq`
*[_type == "home"] {
  _id,
  _type,
  title,
  seo {
    ${pageSEOFields}
  },
  ${componentsByData}
}
`

export const HomePageSchema = z.object({
  _id: z.string(),
  _type: z.literal('home'),
  title: z.string(),
  seo: z.any(),
  components: ComponentsByDataScheme,
})
