import {groq} from 'next-sanity'
import {z} from 'zod'

export const allArtworkSlugsSitemap = groq`
*[_type =='artwork' && defined(slug) && defined(seo) && seo.robotsNoIndex == false] {
  "params": {
    "slug": slug.current,
    "lastmod": _updatedAt
  }
}
`

// should fit SitemapResSchemaType type!
export const ArtworkSitemapResSchema = z.array(
  z.object({
    params: z.object({
      slug: z.string().refine((slug) => slug.includes('/artworks/'), {
        message: "Slug must contain '/artworks/'",
      }),
      lastmod: z.string(),
    }),
  })
)
