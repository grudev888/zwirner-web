import {groq} from 'next-sanity'
import {z} from 'zod'

export const allArtistPageSlugs = groq`
*[_type == "artistPage" && defined(slug.current)][]{
  "params": { "slug": slug.current }
}`

export const AllArtistPageSlugsSchema = z.array(
  z.object({
    params: z.object({
      slug: z.string(),
    }),
  })
)
