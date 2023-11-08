import {groq} from 'next-sanity'
import {z} from 'zod'

export const allArtworkSlugs = groq`
*[_type == "artwork" && defined(slug) && defined(dateSelection.year)]{
  "slug": slug.current,
}[0..100]`

export const AllArtworkSlugsSchema = z.array(
  z.object({
    slug: z.string(),
  })
)
