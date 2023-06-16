import {groq} from 'next-sanity'

import {artworkFields} from '@/sanity/queries/artwork.queries'
import {exhibitionComplexFields, exhibitionSimpleFields} from '@/sanity/queries/exhibition.queries'

export const collectPageData = groq`
*[_type == "collect" ] {
 ...,
 featuredArtworks[]->{
  ${artworkFields}
 },
 exhibitions[]-> {
  ${exhibitionSimpleFields}
  ${exhibitionComplexFields}
 },
 fairs[]-> {
  ${exhibitionSimpleFields}
  ${exhibitionComplexFields}
 },
 hero[]-> {
  _type == "exhibitionPage"=> {
      slug,
      title,
      _type,
      "exhibition": exhibition-> {
        ${exhibitionSimpleFields}
        ${exhibitionComplexFields}
      },
    },
    _type == "fairPage"=> {
      slug,
      title,
      _type,
      "exhibition": exhibition-> {
        ${exhibitionSimpleFields}
        ${exhibitionComplexFields}
      },
    }
 }
}
`
