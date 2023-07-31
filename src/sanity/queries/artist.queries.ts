import {groq} from 'next-sanity'

export const artistById = groq`
*[_type == "artist" && _id == $artistId ] {
  ...
}`

export const artistArtworkBySlug = groq`
*[_type == "artwork" && defined(slug.current) && slug.current == $slug][0]{
  ...,
  artists[]-> {fullName}
}`
