import {groq} from 'next-sanity'

import {componentsByDataScheme} from '@/sanity/queries/page.queries'

const fairPageFields = groq`
  _id,
  title,
  "date":exhibition->.endDate
`

export const getEndDateFairPagesDate = groq`
*[_type == "fairPage"] {
  ${fairPageFields}
}`

export const fairPageSlugs = groq`
*[_type == "fairPage" && defined(slug.current)][]{
  "params": { "slug": slug.current }
}`

export const fairPageBySlug = groq`
*[_type == "fairPage" && slug.current == $slug][0] {
  ...,
  "exhibition": exhibition->,
  components[] {
    _type,
    title,
    ${componentsByDataScheme}
  }
}`

