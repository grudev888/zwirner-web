import {client} from '@/sanity/client'
import {allAvailableArtworksPageSlugsSitemap} from '@/sanity/queries/sitemaps/allAvailableWorksPageSlugsSitemap'
import {SitemapResSchema} from '@/sanity/queries/sitemaps/typesData'

export async function getAllAvailableArtworksPageSlugsSitemap() {
  const data = await client.fetch(allAvailableArtworksPageSlugsSitemap)
  const validatedData = SitemapResSchema.parse(data)
  return validatedData
}
