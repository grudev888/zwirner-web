import {client} from '@/sanity/client'
import {allExhibitionsPageSlugsSitemap} from '@/sanity/queries/sitemaps/allExhibitionsPageSlugsSitemap'
import {SitemapResSchema} from '@/sanity/queries/sitemaps/typesData'

export async function getAllExhibitionsPageSlugsSitemap() {
  const data = await client.fetch(allExhibitionsPageSlugsSitemap)
  const validatedData = SitemapResSchema.parse(data)
  return validatedData
}
