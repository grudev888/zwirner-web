import {groq} from 'next-sanity'

import {SCHEMA_TYPE_JSON_LD} from '@/sanity/schema/objects/utils/jsonLdSchema'

// Must follow JSONLDSchema
const jsonLDFields = groq`
    schemaType,
    (schemaType == '${SCHEMA_TYPE_JSON_LD.ARTICLE}' || schemaType == '${SCHEMA_TYPE_JSON_LD.BLOG}') => {
      article-> {
        _updatedAt,
        _createdAt,
        author->,
        title,
        images,
        publisherName,
        description,
        publisherLogo
      }
    },
    schemaType == '${SCHEMA_TYPE_JSON_LD.BREADCRUMB}' => {
      breadcrumbs
    },
    schemaType == '${SCHEMA_TYPE_JSON_LD.SITELINKS}' => {
      searchPotentialActions
    },
    schemaType == '${SCHEMA_TYPE_JSON_LD.MANUAL}' => {
      manualSchema
    },
`

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
  jsonLD {
    ${jsonLDFields}
  }
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
