import {groq} from 'next-sanity'
import {z} from 'zod'

export const allAvailableWorksPageSlugs = groq`
*[_type == "artistPage" && defined(slug.current) && count(availableWorksSubpage) > 0]{
  "params": {
    "slug": slug.current
  }
}`

export const AllAvailableWorksPageSlugsSchema = z.array(
  z.object({
    params: z.object({
      slug: z.string(),
    }),
  })
)
