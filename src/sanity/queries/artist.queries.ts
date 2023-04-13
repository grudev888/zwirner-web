import {groq} from 'next-sanity'

import artistType from '@/sanity/schema/documents/artist'

export const artistById = groq`
*[_type == "${artistType.name}" && _id == $artistId ] {
  ...
}`
