import {groq} from 'next-sanity'
import {z} from 'zod'

export const allArtworkSlugs = groq`
*[_type == "artwork" && defined(slug) && defined(dateSelection.year)][0...100].slug.current
`

export const AllArtworkSlugsSchema = z.array(z.string())
