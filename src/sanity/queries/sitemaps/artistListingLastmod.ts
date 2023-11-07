import {groq} from 'next-sanity'

export const artistListingLastmod = groq`
*[ _type =='artistListing'] {
  "params": {
    "slug": '/artists',
    "showInSitemap": true,
    "lastmod": _updatedAt
  }
}`
