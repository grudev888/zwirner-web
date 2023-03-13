import {groq} from 'next-sanity'

const exhibitionDateFields = groq`
  _id,
  title,
  "date":exhibition->.endDate
`

export const getEndDateExhibitionsDate = groq`
*[_type == "exhibitionPage"] {
  ${exhibitionDateFields}
}`
