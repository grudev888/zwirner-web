import {groq} from 'next-sanity'

export const artistListingLastmod = groq`
*[ _type =='artistListing'] {
  "params": {
    "slug": '/artists',
    "lastmod": _updatedAt
  }
}`
