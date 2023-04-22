import {groq} from 'next-sanity'

export const artistById = groq`
*[_type == "artist" && _id == $artistId ] {
  ...
}`

