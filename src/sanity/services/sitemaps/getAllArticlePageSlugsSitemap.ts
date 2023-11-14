import {client} from '@/sanity/client'
import {
  allArticlePageSlugsSitemap,
  ArticleSitemapResSchema,
} from '@/sanity/queries/sitemaps/allArticlePageSlugsSitemap'

export async function getAllArticlePageSlugsSitemap() {
  const data = await client.fetch(allArticlePageSlugsSitemap)
  const validatedData = ArticleSitemapResSchema.parse(data)
  return validatedData
}
