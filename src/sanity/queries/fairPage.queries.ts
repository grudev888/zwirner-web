import {groq} from 'next-sanity'

const fairPageFields = groq`
  _id,
  title,
  "date":exhibition->.endDate
`

export const getEndDateFairPagesDate = groq`
*[_type == "fairPage"] {
  ${fairPageFields}
}`
