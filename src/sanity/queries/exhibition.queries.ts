import {groq} from 'next-sanity'

export const exhibitionSimpleFields = groq`
  _id,
  _type,
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
  photos[],
  "artists": artists[]->,
  "artworks": artworks[]->,
  "collections": collections[]->,
  "events": events[]->,
`

export const allExhibitions = groq`
*[_type == "exhibition"] | order(date desc, _updatedAt desc) {
  ${exhibitionSimpleFields}
  ${exhibitionComplexFields}
}`

export const getExhibitionByDate = groq`
*[_type == "exhibition"] {
  ${exhibitionDateFields}
}`

export const exhibitionById = groq`
*[_type == "exhibition" && _id == $exhibitionId ] {
  ...
}`
