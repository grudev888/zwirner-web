import {client} from '@/sanity/client'
import {allAvailableWorksPageSlugsSitemap} from '@/sanity/queries/sitemaps/allAvailableWorksPageSlugsSitemap'
import {SitemapResSchema} from '@/sanity/queries/sitemaps/typesData'

export async function getAllAvailableWorksPageSlugsSitemap() {
  const data = await client.fetch(allAvailableWorksPageSlugsSitemap)
  const validatedData = SitemapResSchema.parse(data)
  return validatedData
}
