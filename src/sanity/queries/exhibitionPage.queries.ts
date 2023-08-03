import {groq} from 'next-sanity'

import {componentsByDataScheme} from '@/sanity/queries/page.queries'
import {pageSEOFields} from '@/sanity/queries/seo.queries'

const exhibitionDateFields = groq`
  _id,
  title,
  "date": endDate
`

export const getEndDateExhibitionsDate = groq`
*[_type == "exhibitionPage"] {
  ${exhibitionDateFields}
}`

export const exhibitionPageSlugs = groq`
*[_type == "exhibitionPage" && defined(slug.current)][]{
  "params": { "slug": slug.current }
}`

export const exhibitionPageBySlug = groq`
*[_type == "exhibitionPage" && slug.current == $slug][0] {
  ...,
  artists[]->,
  location->,
  seo {
    ${pageSEOFields}
  },
  ${componentsByDataScheme}
}`
