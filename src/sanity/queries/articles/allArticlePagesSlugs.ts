import {groq} from 'next-sanity'
import {z} from 'zod'

import {env} from '@/env.mjs'
import {DEV_GROQ_BUILD_LIMIT} from '@/sanity/constants'

// Only run a full build of exhibition pages on production. Other envs will build only first 100 pages, the rest will be rendered on demand
const limit = env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? '' : DEV_GROQ_BUILD_LIMIT

// Fetch all pages with body content available and slug. retrieve the url
export const allArticlePagesSlugs = groq`
*[_type == "article" && defined(slug.current) && defined(body)]{
  "params": { "slug": slug.current }
}${limit}`

export const AllArticlePageSlugsSchema = z.array(
  z.object({
    params: z.object({
      slug: z.string(),
    }),
  })
)
