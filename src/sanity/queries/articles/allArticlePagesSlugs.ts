import {groq} from 'next-sanity'
import {z} from 'zod'

import {DEV_GROQ_BUILD_LIMIT} from '@/sanity/constants'

// Fetch all pages with body content available and slug. retrieve the url
// There's a limit of returned pages for envs different than production.
// Pages not returned in this query will be generated on demand
export const allArticlePagesSlugs = groq`
*[_type == "article" && defined(slug.current) && defined(body)]{
  "params": { "slug": slug.current }
}${DEV_GROQ_BUILD_LIMIT}`

export const AllArticlePageSlugsSchema = z.array(
  z.object({
    params: z.object({
      slug: z.string(),
    }),
  })
)
