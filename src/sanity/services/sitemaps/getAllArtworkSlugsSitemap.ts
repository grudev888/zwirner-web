import {client} from '@/sanity/client'
import {allArtworkSlugsSitemap} from '@/sanity/queries/sitemaps/allArtworkSlugsSitemap'
import {SitemapResSchema} from '@/sanity/queries/sitemaps/typesData'

// TODO: add validation error handling
export async function getAllArtworkSlugsSitemap() {
  const data = await client.fetch(allArtworkSlugsSitemap)
  const validatedData = SitemapResSchema.parse(data)
  return validatedData
}
