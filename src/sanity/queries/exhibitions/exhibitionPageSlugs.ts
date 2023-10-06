import {groq} from 'next-sanity'
import {z} from 'zod'

export const exhibitionPageSlugs = groq`
*[_type in ["exhibitionPage", "exceptionalWork", "onlineExhibitionPage"] && defined(slug.current)]{
  "params": { "slug": slug.current },
}`

export const ExhibitionPageSlugsSchema = z.array(
  z.object({
    params: z.object({
      slug: z.string(),
    }),
  })
)
