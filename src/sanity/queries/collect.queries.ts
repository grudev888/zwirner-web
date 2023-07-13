import {groq} from 'next-sanity'

import {artworkFields} from '@/sanity/queries/artwork.queries'
import {exhibitionComplexFields, exhibitionSimpleFields} from '@/sanity/queries/exhibition.queries'

export const collectPageData = groq`
*[_type == "collect" ] {
 ...,
 featuredArtworks[]->{
  ${artworkFields}
 },
 exhibitions {
  ...,
  items[]->{
    ...,
    _type == "exhibitionPage"=> {
      title,
      _type,
      "exhibition": exhibition-> {
        ${exhibitionSimpleFields}
        ${exhibitionComplexFields}
      },
    }
  }
 },
 fairs {
  ...,
  items[]->{
    ...,
    _type == "exhibitionPage"=> {
      title,
      _type,
      "exhibition": exhibition-> {
        ${exhibitionSimpleFields}
        ${exhibitionComplexFields}
      },
    }
  }
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
