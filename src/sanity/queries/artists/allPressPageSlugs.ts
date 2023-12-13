import {groq} from 'next-sanity'
import {z} from 'zod'

// Press subpage only supports grid as a unique page builder element, we need to check the length of the array then
export const allPressPageSlugs = groq`
*[_type == "artistPage" && defined(slug.current) && count(pressSubpage.grid) > 0]{
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
