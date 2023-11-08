import {groq} from 'next-sanity'
import {z} from 'zod'

export const allPressPageSlugs = groq`
*[_type == "artistPage" && defined(slug.current) && defined(pressSubpage)]{
  "params": {
    "slug": slug.current
  }
}`

export const AllPressPageSlugsSchema = z.array(
  z.object({
    params: z.object({
      slug: z.string(),
    }),
  })
)
