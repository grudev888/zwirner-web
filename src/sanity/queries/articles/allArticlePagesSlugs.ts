import {groq} from 'next-sanity'
import {z} from 'zod'

// Fetch all pages with body content available and slug. retrieve the url
export const allArticlePagesSlugs = groq`
*[_type == "article" && defined(slug.current) && defined(body)]{
  "params": { "slug": slug.current }
}`

export const AllArticlePageSlugsSchema = z.array(
  z.object({
    params: z.object({
      slug: z.string(),
    }),
  })
)
