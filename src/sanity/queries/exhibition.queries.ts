import {groq} from 'next-sanity'

import exhibitionType from '@/sanity/schema/documents/exhibition'

export const exhibitionSimpleFields = groq`
  _id,
  title,
  subtitle,
  description,
  summary,
  startDate,
  endDate,
`

const exhibitionDateFields = groq`
  _id,
  "date": endDate,
`

export const exhibitionComplexFields = groq`
  "artists": artists[]->,
  "artworks": artworks[]->,
  "collections": collections[]->,
  "events": events[]->,
`

export const allExhibitions = groq`
*[_type == "${exhibitionType.name}"] | order(date desc, _updatedAt desc) {
  ${exhibitionSimpleFields}
  ${exhibitionComplexFields}
}`

export const getExhibitionByDate = groq`
*[_type == "${exhibitionType.name}"] {
  ${exhibitionDateFields}
}`

export const exhibitionById = groq`
*[_type == "${exhibitionType.name}" && _id == $exhibitionId ] {
  ...
}`
