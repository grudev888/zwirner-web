import {groq} from 'next-sanity'
import {z} from 'zod'

export const allGuidePageSlugs = groq`
*[_type == "artistPage" && defined(slug.current) && count(guideSubpage.grid) > 0]{
  "params": {
    "slug": slug.current
  }
}`

export const AllGuidePageSlugsSchema = z.array(
  z.object({
    params: z.object({
      slug: z.string(),
    }),
  })
)
