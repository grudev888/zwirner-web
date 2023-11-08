import {client} from '@/sanity/client'
import {allGuidePageSlugsSitemap} from '@/sanity/queries/sitemaps/allGuidePageSlugsSitemap'
import {SitemapResSchema} from '@/sanity/queries/sitemaps/typesData'

export async function getAllGuidePageSlugsSitemap() {
  const data = await client.fetch(allGuidePageSlugsSitemap)
  const validatedData = SitemapResSchema.parse(data)
  return validatedData
}
