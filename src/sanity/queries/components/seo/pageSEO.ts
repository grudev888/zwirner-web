import {groq} from 'next-sanity'

// UNUSED
export const pageSEO = groq`
  *[_type == $pageType && _id == $pageId ] {
    pageSEOFields
  }
`
