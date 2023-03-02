import {groq} from 'next-sanity'

import {exhibitionComplexFields,exhibitionSimpleFields} from './exhibition.queries';

const pageSimpleFields = groq`
  _id,
  _type,
  slug,
  title,
`

const pageComplexFields = groq`
   exhibition-> {
     ${exhibitionSimpleFields}
     ${exhibitionComplexFields}
   },
`

export const pageSlugs = groq`*[_type == "page" && defined(slug.current)][]{
  "params": { "slug": slug.current }
}`

export const pageBySlug = groq`
*[_type == "page" && slug.current == $slug][0] {
  ${pageSimpleFields}
  ${pageComplexFields}
}`
