import {client} from '@/sanity/client'
import {allArticlePageSlugsSitemap} from '@/sanity/queries/sitemaps/allArticlePageSlugsSitemap'
import {SitemapResSchema} from '@/sanity/queries/sitemaps/typesData'

export async function getAllArticlePageSlugsSitemap() {
  const data = await client.fetch(allArticlePageSlugsSitemap)
  const validatedData = SitemapResSchema.parse(data)
  return validatedData
}
