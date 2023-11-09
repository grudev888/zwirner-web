import {groq} from 'next-sanity'
import {z} from 'zod'

import {env} from '@/env.mjs'
import {DEV_GROQ_BUILD_LIMIT} from '@/sanity/constants'

// Only run a full build of artwork pages on production. Other envs will build only first 100 pages, the rest will be rendered on demand
const limit = env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? '' : DEV_GROQ_BUILD_LIMIT

export const allArtworkSlugs = groq`
*[_type == "artwork" && defined(slug) && defined(dateSelection.year)]{
  "slug": slug.current,
}${limit}`

export const AllArtworkSlugsSchema = z.array(
  z.object({
    slug: z.string(),
  })
)
