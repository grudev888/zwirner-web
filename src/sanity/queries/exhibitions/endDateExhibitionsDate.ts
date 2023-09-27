import {groq} from 'next-sanity'
import {z} from 'zod'

const exhibitionDateFields = groq`
  _id,
  title,
  "date": endDate
`
// UNUSED
export const endDateExhibitionsDate = groq`
*[_type == "exhibitionPage"] {
  ${exhibitionDateFields}
}`

export const EndDateExhibitionsDateSchema = z.array(
  z.object({
    _id: z.string(),
    title: z.string(),
    date: z.any(),
  })
)
