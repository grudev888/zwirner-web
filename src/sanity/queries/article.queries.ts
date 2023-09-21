import {groq} from 'next-sanity'

import {exhibitionComplexFields, exhibitionSimpleFields} from '@/sanity/queries/exhibition.queries'
import {mediaBuilder} from '@/sanity/queries/object.queries'

// Fetch all pages with body content available and slug. retrieve the url
export const articlePagesSlugs = groq`
*[_type == "article" && defined(slug.current) && defined(body)][]{
  "params": { "slug": [slug.current] }
}`

export const articlesReferences = groq`
  articles[]-> {
    ...,
    header[]{
      ${mediaBuilder}
    },
    _type == "exhibitionPage"=> {
      ...,
      title,
      _type,
      "exhibition":  {
        ${exhibitionSimpleFields}
        ${exhibitionComplexFields}
      },
    }
  }
`

export const pressPagesSlugs = groq`
*[_type == "article" && defined(slug.current)  && defined(body) && type == "pressRelease"][]{
  "params": {
    "slug": string::split(slug.current, "/")[2],
    "press": string::split(slug.current, "/")[4]
   }
}`

export const pressBySlug = groq`
*[_type == "article" && type == "pressRelease" && slug.current == $slug][0]{
  ...,
  location-> {
    name
  },
  "artistPageData": *[_type == "artistPage" && references(^._id)][0]{
    title,
    'parentUrl': slug.current
  },
  ${articlesReferences}
}
`

export const articleBySlug = groq`
*[_type == "article" && slug.current == $slug][0]{
  ...,
  interstitial {
    ...,
    image {
      ${mediaBuilder}
    }
  },
  header[]{
    ${mediaBuilder}
  },
  image {
    image {
      ...
    }
  },
  location-> {
    name
  },
  ${articlesReferences},
  type == "pressRelease" => {
    'pdfURL': pdf.asset->url,
    location->
  }
}`
