import {groq} from 'next-sanity'
import {z} from 'zod'

export const allArtworkSlugs = groq`
*[_type == "artwork" && defined(slug)].slug.current`

export const AllArtworkSlugsSchema = z.array(z.string())
