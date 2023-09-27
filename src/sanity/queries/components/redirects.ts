import {groq} from 'next-sanity'
import {z} from 'zod'

// Must follow RedirectSchema
export const redirects = groq`
*[_type=="redirect"] {
  _id,
  to,
  from
}
`

export const RedirectSchema = z.object({
  _id: z.string(),
  to: z.string(),
  from: z.string(),
})
