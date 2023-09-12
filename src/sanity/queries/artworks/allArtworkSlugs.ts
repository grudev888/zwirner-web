import {groq} from 'next-sanity'

export const allArtworkSlugs = groq`
*[_type == "artwork" && defined(slug)].slug.current`
