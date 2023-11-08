import {groq} from 'next-sanity'
import {z} from 'zod'

export const allAvailableWorksPageSlugs = groq`
*[_type == "artistPage" && defined(slug.current) && defined(availableWorksSubpage)]{
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
