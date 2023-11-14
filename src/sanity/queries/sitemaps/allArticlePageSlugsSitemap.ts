import {groq} from 'next-sanity'
import {z} from 'zod'

// Fetch all pages with body content available and slug. retrieve the url
export const allArticlePageSlugsSitemap = groq`
*[_type == "article" && defined(slug.current) && defined(body) && defined(seo) && seo.robotsNoIndex == false]{
  "params": {
    "slug": slug.current,
    "lastmod": _updatedAt
  }
}`

// should fit SitemapResSchemaType type!
export const ArticleSitemapResSchema = z.array(
  z.object({
    params: z.object({
      slug: z.string().refine((slug) => slug.includes('/news/'), {
        message: "Slug must contain '/news/'",
      }),
      lastmod: z.string(),
    }),
  })
)
