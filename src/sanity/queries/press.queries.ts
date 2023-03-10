import {groq} from 'next-sanity'

const pressDateFields = groq`
  _id,
  "date": publishDate,
`

export const getPressByDate = groq`
*[_type == "press"] {
  ${pressDateFields}
}`
