import {groq} from 'next-sanity'
import {z} from 'zod'

import {DEV_GROQ_BUILD_LIMIT} from '@/sanity/constants'

// Fetch all valid artworks.
// There's a limit of returned pages for envs different than production.
// Pages not returned in this query will be generated on demand
export const allArtworkSlugs = groq`
*[_type == "artwork" && defined(slug) && defined(dateSelection.year)]{
  "slug": slug.current,
}${DEV_GROQ_BUILD_LIMIT}`

export const AllArtworkSlugsSchema = z.array(
  z.object({
    slug: z.string().refine((slug) => slug.includes('/artworks/'), {
      message: "Slug must contain '/artworks/'",
    }),
  })
)
