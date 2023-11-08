import {client} from '@/sanity/client'
import {allPressPageSlugsSitemap} from '@/sanity/queries/sitemaps/allPressPageSlugsSitemap'
import {SitemapResSchema} from '@/sanity/queries/sitemaps/typesData'

export async function getAllPressPageSlugsSitemap() {
  const data = await client.fetch(allPressPageSlugsSitemap)
  const validatedData = SitemapResSchema.parse(data)
  return validatedData
}
