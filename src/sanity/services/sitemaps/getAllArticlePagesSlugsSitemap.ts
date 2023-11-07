import {client} from '@/sanity/client'
import {allArticlePagesSlugsSitemap} from '@/sanity/queries/sitemaps/allArticlePagesSlugsSitemap'
import {SitemapResSchema} from '@/sanity/queries/sitemaps/typesData'

export async function getAllArticlePagesSlugsSitemap() {
  const data = await client.fetch(allArticlePagesSlugsSitemap)
  const validatedData = SitemapResSchema.parse(data)
  return validatedData
}
