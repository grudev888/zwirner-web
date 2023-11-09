import {groq} from 'next-sanity'
import {z} from 'zod'

import {DEV_GROQ_BUILD_LIMIT} from '@/sanity/constants'

// There's a limit of returned pages for envs different than production.
// Pages not returned in this query will be generated on demand
export const exhibitionPageSlugs = groq`
*[_type in ["exhibitionPage", "exceptionalWork", "onlineExhibitionPage"] && defined(slug.current)]{
  "params": { "slug": slug.current },
}${DEV_GROQ_BUILD_LIMIT}`

export const ExhibitionPageSlugsSchema = z.array(
  z.object({
    params: z.object({
      slug: z.string(),
    }),
  })
)
