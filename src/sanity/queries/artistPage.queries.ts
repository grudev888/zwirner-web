import {groq} from 'next-sanity'

import {componentsByDataScheme} from '@/sanity/queries/page.queries'
import {pageSEOFields} from '@/sanity/queries/seo.queries'

export const artistPageSlugs = groq`
*[_type == "artistPage" && defined(slug.current)][]{
  "params": { "slug": slug.current }
}`

export const getAllArtistsPages = groq`{
  "pageInfo": *[_type == "artistListing"] {
    ...
  },
  "artistPages":*[_type == "artistPage" && defined(slug.current) && artist->.affiliation == true] {
    ...,
    artist->
  }
}`

export const artistPageBySlug = groq`
*[_type == "artistPage" && slug.current == $slug][0] {
  _id,
  title,
  "artist": artist->,
  ${componentsByDataScheme}
  seo {
    ${pageSEOFields}
  },
  slug,
}`
