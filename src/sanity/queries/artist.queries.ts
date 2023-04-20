import {groq} from 'next-sanity'

import {componentsByDataScheme} from '@/sanity/queries/page.queries'
export const artistById = groq`
*[_type == "artist" && _id == $artistId ] {
  ...
}`

export const artistPageSlugs = groq`
*[_type == "artistPage" && defined(slug.current)][]{
  "params": { "slug": slug.current }
}`

export const artistPageBySlug = groq`
*[_type == "artistPage" && slug.current == $slug][0] {
  ...,
  "artist": artist->,
  ${componentsByDataScheme}
}`
