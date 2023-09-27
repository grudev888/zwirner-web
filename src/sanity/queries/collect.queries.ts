import {groq} from 'next-sanity'

import {artworkFields} from '@/sanity/queries/artwork.queries'

import {
  exhibitionComplexFields,
  exhibitionSimpleFields,
} from './components/content/exhibitionPageContent'

export const collectPageData = groq`
*[_type == "collect" ] {
 ...,
 featuredArtworks[]->{
  ${artworkFields}
 },
 exhibitions {
  ...,
  items[]->{
    title,
    _type,
    ${exhibitionSimpleFields}
    ${exhibitionComplexFields}
  }
 },
 fairs {
  ...,
  items[]->{
    title,
    _type,
    ${exhibitionSimpleFields}
    ${exhibitionComplexFields}
  }
 },
 hero[]-> {
  _type == "exhibitionPage"=> {
      ${exhibitionSimpleFields}
      ${exhibitionComplexFields}
    },
 }
}
`
