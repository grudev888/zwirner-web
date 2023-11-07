import {client} from '@/sanity/client'
import {allArtistPageSlugsSitemap} from '@/sanity/queries/sitemaps/allArtistPageSlugsSitemap'
import {SitemapResSchema} from '@/sanity/queries/sitemaps/typesData'

export async function getAllArtistPageSlugsSitemap() {
  const data = await client.fetch(allArtistPageSlugsSitemap)
  const validatedData = SitemapResSchema.parse(data)
  return validatedData
}
