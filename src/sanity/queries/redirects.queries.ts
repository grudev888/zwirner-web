import {groq} from 'next-sanity'

// Must follow RedirectSchema
export const redirects = groq`
*[_type=="redirect"] {
  _id,
  to,
  from
}
`
