import {groq} from 'next-sanity'

import {exhibitionComplexFields, exhibitionSimpleFields} from '@/sanity/queries/exhibition.queries'

// Fetch all pages with body content available and slug. retrieve the url
export const articlePagesSlugs = groq`
*[_type == "article" && defined(slug.current) && defined(body)][]{
  "params": { "slug": slug.current }
}`

export const articleBySlug = groq`
*[_type == "article" && slug.current == $slug][0]{
  ...,
  articles[]-> {
    ...,
    _type == "fairPage"=> {
      slug,
      title,
      _type,
      "exhibition": exhibition-> {
        ${exhibitionSimpleFields}
        ${exhibitionComplexFields}
      },
    },
    _type == "exhibitionPage"=> {
      title,
      _type,
      "exhibition": exhibition-> {
        ${exhibitionSimpleFields}
        ${exhibitionComplexFields}
      },
    }
  },
  type == "pressRelease" => {
    'pdfURL': pressReleasePDF.asset->url,
    location->,
    event->
  }
}`
