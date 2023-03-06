import {groq} from 'next-sanity'

export const exhibitionSimpleFields = groq`
  _id,
  title,
  subtitle,
  description,
  summary,
  startDate,
  endDate,
`

export const exhibitionComplexFields = groq`
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
