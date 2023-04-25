import {groq} from 'next-sanity'

// Must follow PageSEOSchema
export const pageSEOFields = groq`
  pageTitle,
  metaDescription,
  h1Header,
  canonicalURL,
  robotsNoIndex,
  robotsNoFollow,
  imageMeta,
  socialTitle,
  socialDescription,
  overrideSchema
`

export const pageSEO = groq`
  *[_type == $pageType && _id == $pageId ] {
    pageSEOFields
  }
`

// Must follow GlobalSEOScheme
export const generalSEOFields = groq`
  _id,
  globalSEOTitle,
  globalSEODescription,
  globalSEOImage
`

export const generalSEO = groq`
*[_type == "globalSEO"] {
  ${generalSEOFields}
}`
