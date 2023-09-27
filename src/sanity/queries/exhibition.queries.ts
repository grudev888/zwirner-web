import {groq} from 'next-sanity'

import {
  exhibitionComplexFields,
  exhibitionSimpleFields,
} from './components/content/exhibitionPageContent'

const exhibitionDateFields = groq`
  _id,
  "date": endDate,
`

export const allExhibitions = groq`
*[_type == "exhibitionPage"] | order(date desc, _updatedAt desc) {
  ${exhibitionSimpleFields}
  ${exhibitionComplexFields}
}`

export const getExhibitionByDate = groq`
*[_type == "exhibitionPage"] {
  ${exhibitionDateFields}
}`

export const exhibitionById = groq`
*[_type == "exhibitionPage" && _id == $exhibitionId ] {
  ...
}`
