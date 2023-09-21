import {groq} from 'next-sanity'

import {mediaBuilder} from '@/sanity/queries/object.queries'

export const exhibitionSimpleFields = groq`
  _id,
  _type,
  title,
  slug,
  subtitle,
  description,
  summary,
  startDate,
  endDate,
  displayDate,
  status,
  eyebrow,
`

const exhibitionDateFields = groq`
  _id,
  "date": endDate,
`

export const exhibitionComplexFields = groq`
  photos[],
  "artists": artists[]->,
  "artworks": artworks[]->,
  "collections": collections[]->,
  "locations": locations[]->,
  heroMedia {
    ${mediaBuilder}
  }
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
