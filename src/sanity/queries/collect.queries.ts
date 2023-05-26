import {groq} from 'next-sanity'

import {exhibitionComplexFields, exhibitionSimpleFields} from '@/sanity/queries/exhibition.queries'

export const collectPageData = groq`
*[_type == "collect" ] {
 ...,
 exhibitions[]-> {
  ${exhibitionSimpleFields}
  ${exhibitionComplexFields}
 },
 fairs[]-> {
  ${exhibitionSimpleFields}
  ${exhibitionComplexFields}
 },
 featuredArtworks[]->
}
`
