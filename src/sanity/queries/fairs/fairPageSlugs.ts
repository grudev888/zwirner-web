import {groq} from 'next-sanity'
import {z} from 'zod'

export const fairPageSlugs = groq`
*[_type == "fairPage" && defined(slug.current)][]{
  "params": { "slug": slug.current }
}`

export const FairPageSlugsSchema = z.array(
  z.object({
    params: z.object({
      slug: z.string(),
    }),
  })
)
